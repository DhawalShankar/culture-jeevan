"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_URL ?? "http://localhost:8000";
const POLL_INTERVAL_MS = 30_000;
// ─────────────────────────────────────────────────────────────────────────────

export interface Notification {
  id: number | string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string; // ISO string
  url?: string;       // optional — click karne par kahan jaana hai
  type?: "booking" | "payment" | "message" | "system"; // badge color ke liye
}

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
}

// ─── Django API helpers ───────────────────────────────────────────────────────

async function apiFetch<T>(path: string, signal: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(`${DJANGO_BASE_URL}${path}`, {
      signal,
      cache: "no-store",
      // credentials: "include",  // session auth ke liye uncomment karo
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Django se notifications fetch karta hai.
 *
 * Expected endpoints:
 *   GET  /api/notifications/             → { results: Notification[], unread_count: number }
 *   POST /api/notifications/{id}/read/   → marks one as read
 *   POST /api/notifications/read-all/    → marks all as read
 *
 * Jab tak endpoints exist nahi hain, hook silently 0 / empty list return karta hai.
 */
export function useNotifications(enabled: boolean) {
  const [state, setState] = useState<NotificationsState>({
    items: [],
    unreadCount: 0,
    loading: false,
  });

  const abortRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAll = useCallback(async (signal: AbortSignal) => {
    const data = await apiFetch<{ results: Notification[]; unread_count: number }>(
      "/api/notifications/",
      signal
    );

    if (!data) {
      // Endpoint nahi hai ya error — silently ignore, count 0 rakho
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    setState({
      items: Array.isArray(data.results) ? data.results : [],
      unreadCount: typeof data.unread_count === "number" ? data.unread_count : 0,
      loading: false,
    });
  }, []);

  useEffect(() => {
    if (!enabled) {
      setState({ items: [], unreadCount: 0, loading: false });
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({ ...prev, loading: true }));
    fetchAll(controller.signal);

    intervalRef.current = setInterval(() => {
      fetchAll(controller.signal);
    }, POLL_INTERVAL_MS);

    return () => {
      controller.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled, fetchAll]);

  // ── Ek notification ko read mark karo ───────────────────────────────────────
  const markAsRead = useCallback(async (id: number | string) => {
    // Optimistic update — UI turant update ho
    setState((prev) => ({
      ...prev,
      items: prev.items.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      unreadCount: Math.max(0, prev.unreadCount - 1),
    }));

    try {
      await fetch(`${DJANGO_BASE_URL}/api/notifications/${id}/read/`, {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // API fail hone par bhi UI updated rehti hai
    }
  }, []);

  // ── Sab read mark karo ───────────────────────────────────────────────────────
  const markAllAsRead = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((n) => ({ ...n, is_read: true })),
      unreadCount: 0,
    }));

    try {
      await fetch(`${DJANGO_BASE_URL}/api/notifications/read-all/`, {
        method: "POST",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // Silently ignore
    }
  }, []);

  return { ...state, markAsRead, markAllAsRead };
}