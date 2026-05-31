"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Notification } from "@/hooks/useNotifications";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  try {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60)   return `${diff}s pehle`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m pehle`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h pehle`;
    return `${Math.floor(diff / 86400)}d pehle`;
  } catch {
    return "";
  }
}

const TYPE_COLORS: Record<string, string> = {
  booking:  "#C4703A",
  payment:  "#2D7A4F",
  message:  "#3A6BC4",
  system:   "#8A7A6A",
};

const TYPE_ICONS: Record<string, string> = {
  booking:  "📅",
  payment:  "💳",
  message:  "💬",
  system:   "🔔",
};

// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (id: number | string) => void;
  markAllAsRead: () => void;
  /** Bell button ka ref — bahar click detect karne ke liye */
  anchorRef: React.RefObject<HTMLElement | null>;
}

export default function NotificationsOverlay({
  open,
  onClose,
  notifications,
  unreadCount,
  loading,
  markAsRead,
  markAllAsRead,
  anchorRef,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ── Bahar click karne par close karo ──────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose, anchorRef]);

  // ── Escape key ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleNotifClick = (notif: Notification) => {
    markAsRead(notif.id);
    if (notif.url) {
      onClose();
      router.push(notif.url);
    }
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: "360px",
        maxWidth: "calc(100vw - 2rem)",
        backgroundColor: "#FAF7F2",
        border: "1px solid #E8DED0",
        borderRadius: "14px",
        boxShadow: "0 8px 32px rgba(92,74,58,0.14), 0 2px 8px rgba(92,74,58,0.08)",
        zIndex: 200,
        overflow: "hidden",
        animation: "overlayIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .notif-item:hover {
          background-color: rgba(196,112,58,0.05) !important;
        }
        .notif-item:active {
          background-color: rgba(196,112,58,0.10) !important;
        }
        .mark-all-btn:hover {
          color: #A85C2E !important;
        }
        .view-all-btn:hover {
          background-color: rgba(196,112,58,0.08) !important;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E8DED0; border-radius: 4px; }
      `}</style>

      {/* ── Header ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.1rem 0.75rem",
        borderBottom: "1px solid #E8DED0",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "#1C1410",
            letterSpacing: "-0.01em",
          }}>
            Notifications
          </span>
          {unreadCount > 0 && (
            <span style={{
              backgroundColor: "#C4703A",
              color: "#FAF7F2",
              fontSize: "10px",
              fontWeight: 700,
              padding: "1px 7px",
              borderRadius: "10px",
              lineHeight: "18px",
              display: "inline-block",
            }}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#C4703A",
              padding: "0.2rem 0",
              fontFamily: "inherit",
              transition: "color 0.15s",
            }}
          >
            Mark All Read!
          </button>
        )}
      </div>

      {/* ── Notification list ── */}
      <div style={{
        maxHeight: "360px",
        overflowY: "auto",
      }}>

        {/* Loading state */}
        {loading && notifications.length === 0 && (
          <div style={{
            padding: "2.5rem 1rem",
            textAlign: "center",
            color: "#8A7A6A",
            fontSize: "0.85rem",
          }}>
            <div style={{ marginBottom: "0.5rem", fontSize: "1.5rem", opacity: 0.5 }}>🔔</div>
            Loading...
          </div>
        )}

        {/* Empty state */}
        {!loading && notifications.length === 0 && (
          <div style={{
            padding: "2.5rem 1rem",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
            <p style={{
              color: "#5C4A3A",
              fontSize: "0.875rem",
              fontWeight: 600,
              margin: "0 0 0.25rem",
            }}>
              Come back later!
            </p>
            <p style={{ color: "#8A7A6A", fontSize: "0.8rem", margin: 0 }}>
              You have read all notifications!
            </p>
          </div>
        )}

        {/* Items */}
        {notifications.map((notif, i) => {
          const typeColor = TYPE_COLORS[notif.type ?? "system"] ?? TYPE_COLORS.system;
          const typeIcon  = TYPE_ICONS[notif.type ?? "system"]  ?? TYPE_ICONS.system;
          const isLast    = i === notifications.length - 1;

          return (
            <div
              key={notif.id}
              className="notif-item"
              onClick={() => handleNotifClick(notif)}
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "0.875rem 1.1rem",
                cursor: notif.url ? "pointer" : "default",
                borderBottom: isLast ? "none" : "1px solid #F0E9DF",
                backgroundColor: notif.is_read ? "transparent" : "rgba(196,112,58,0.04)",
                transition: "background-color 0.15s",
                position: "relative",
              }}
            >
              {/* Unread dot */}
              {!notif.is_read && (
                <span style={{
                  position: "absolute",
                  top: "50%",
                  left: "0.4rem",
                  transform: "translateY(-50%)",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#C4703A",
                  flexShrink: 0,
                }} />
              )}

              {/* Icon circle */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: `${typeColor}15`,
                border: `1px solid ${typeColor}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
              }}>
                {typeIcon}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: "0 0 0.2rem",
                  fontSize: "0.825rem",
                  fontWeight: notif.is_read ? 500 : 700,
                  color: "#1C1410",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {notif.title}
                </p>
                <p style={{
                  margin: "0 0 0.3rem",
                  fontSize: "0.775rem",
                  color: "#5C4A3A",
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {notif.message}
                </p>
                <span style={{
                  fontSize: "0.7rem",
                  color: "#8A7A6A",
                  fontWeight: 500,
                }}>
                  {timeAgo(notif.created_at)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer: View All button ── */}
      <div style={{
        padding: "0.625rem 1.1rem",
        borderTop: notifications.length > 0 ? "1px solid #E8DED0" : "none",
      }}>
        <Link
          href="/notifications"
          onClick={onClose}
          className="view-all-btn"
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#C4703A",
            textDecoration: "none",
            padding: "0.5rem",
            borderRadius: "8px",
            transition: "background-color 0.15s",
          }}
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}