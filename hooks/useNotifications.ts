// hooks/useNotifications.ts
import { useState, useEffect, useCallback, useRef } from "react";

export interface Notification {
  id: string;
  type: "booking" | "payment" | "message" | "system";
  title: string;
  message: string;
  url?: string;
  is_read: boolean;
  created_at: string;
}

export function useNotifications(enabled: boolean, userId?: string) {
  const [items,       setItems]       = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading,     setLoading]     = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const fetchNotifs = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notifications/?user_id=${userId}`
      );
      if (!res.ok) return;
      const data: Notification[] = await res.json();
      setItems(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    } catch (e) {
      console.error("Notifications fetch failed", e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!enabled || !userId) return;
    setLoading(true);
    fetchNotifs();
    intervalRef.current = setInterval(fetchNotifs, 15_000);
    return () => clearInterval(intervalRef.current);
  }, [enabled, userId, fetchNotifs]);

  const markAsRead = useCallback(async (id: string | number) => {
    setItems(prev => prev.map(n => n.id === String(id) ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/${id}/read/`, { method: "POST" });
    } catch (e) { console.error(e); }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setItems(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/read-all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
    } catch (e) { console.error(e); }
  }, [userId]);

  return { items, unreadCount, loading, markAsRead, markAllAsRead };
}