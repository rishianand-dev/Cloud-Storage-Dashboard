import type { ApiErrorDetail } from "@/types"

export function AuthAlert({
  tone,
  message,
  details,
}: {
  tone: "error" | "success"
  message: string
  details?: ApiErrorDetail[]
}) {
  const isError = tone === "error"
  return (
    <div
      style={{
        marginBottom: 16,
        padding: "12px 14px",
        borderRadius: 14,
        background: isError ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.1)",
        color: isError ? "#EF4444" : "#059669",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <div>{message}</div>
      {details && details.length > 0 && (
        <ul style={{ margin: "8px 0 0", paddingLeft: 18, fontWeight: 500 }}>
          {details.map((detail) => (
            <li key={`${detail.path}-${detail.message}`}>
              {detail.path !== "root" ? `${detail.path}: ${detail.message}` : detail.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
