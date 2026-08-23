import { Icon } from "@/components/ui/Icon"
import { ic } from "@/lib/constants/icons"

export function StarButton({
  starred,
  onClick,
}: {
  starred: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      onClick={onClick}
      style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2 }}
    >
      <Icon
        d={ic.star}
        size={15}
        color={starred ? "#F59E0B" : "#C4C9DC"}
        fill={starred ? "#F59E0B" : "none"}
        strokeWidth={1.8}
      />
    </button>
  )
}
