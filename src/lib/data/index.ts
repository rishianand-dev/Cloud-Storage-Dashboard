import type {
  AccountMenuItem,
  AccountTabId,
  FileItem,
  NavId,
  NavItem,
  NotificationItem,
  QuickFolder,
  RootFile,
  SectionMeta,
  UserAccount,
} from "@/types"

export const navItems: NavItem[] = [
  { id: "drive", label: "My Drive", icon: "cloud", badge: 0 },
  { id: "recent", label: "Recent", icon: "clock", badge: 0 },
  { id: "favorites", label: "Favorites", icon: "star", badge: 0 },
  { id: "shared", label: "Shared", icon: "users", badge: 4 },
  { id: "trash", label: "Trash", icon: "trash", badge: 0 },
  { id: "archive", label: "Archive", icon: "archive", badge: 0 },
  { id: "offline", label: "Offline", icon: "offline", badge: 0 },
]

const quickFoldersData: QuickFolder[] = [
  {
    id: "q1",
    name: "Projects",
    count: 124,
    modified: "2h ago",
    color: "#5B7CFA",
    bg: "#EEF1FF",
    files: [
      { name: "Project Proposal", ext: "docx", size: "2.4 MB", icon: "doc", iconColor: "#5B7CFA" },
      { name: "Roadmap Q2", ext: "fig", size: "14 MB", icon: "image", iconColor: "#A855F7" },
      { name: "Sprint Notes", ext: "pdf", size: "980 KB", icon: "doc", iconColor: "#EF4444" },
    ],
  },
  {
    id: "q2",
    name: "Design Assets",
    count: 89,
    modified: "Yesterday",
    color: "#A855F7",
    bg: "#F5EEFF",
    files: [
      { name: "Brand Kit", ext: "fig", size: "38 MB", icon: "image", iconColor: "#A855F7" },
      { name: "Icon Set v3", ext: "svg", size: "1.2 MB", icon: "image", iconColor: "#EC4899" },
      { name: "UI Components", ext: "fig", size: "22 MB", icon: "image", iconColor: "#5B7CFA" },
    ],
  },
  {
    id: "q3",
    name: "Invoices",
    count: 42,
    modified: "3 days ago",
    color: "#10B981",
    bg: "#EEFAF5",
    files: [
      { name: "INV-2025-041", ext: "pdf", size: "340 KB", icon: "doc", iconColor: "#EF4444" },
      { name: "INV-2025-040", ext: "pdf", size: "310 KB", icon: "doc", iconColor: "#EF4444" },
      { name: "Expenses Jan", ext: "xlsx", size: "890 KB", icon: "sheet", iconColor: "#10B981" },
    ],
  },
  {
    id: "q4",
    name: "Personal",
    count: 67,
    modified: "Last week",
    color: "#F59E0B",
    bg: "#FFF8EC",
    files: [
      { name: "Vacation Photos", ext: "zip", size: "1.8 GB", icon: "inbox", iconColor: "#0EA5E9" },
      { name: "Resume 2025", ext: "pdf", size: "220 KB", icon: "doc", iconColor: "#EF4444" },
      { name: "Playlist Mix", ext: "mp3", size: "8.7 MB", icon: "music", iconColor: "#0EA5E9" },
    ],
  },
]

const rootFilesData: RootFile[] = [
  {
    id: "r1",
    name: "Annual Report 2024",
    ext: "pdf",
    icon: "doc",
    iconBg: "#FCE8E8",
    iconColor: "#EF4444",
    size: "8.2 MB",
    modified: "Today",
  },
  {
    id: "r2",
    name: "Team Photo",
    ext: "png",
    icon: "image",
    iconBg: "#F5EEFF",
    iconColor: "#A855F7",
    size: "4.7 MB",
    modified: "Yesterday",
  },
  {
    id: "r3",
    name: "Meeting Notes",
    ext: "docx",
    icon: "doc",
    iconBg: "#EEF1FF",
    iconColor: "#5B7CFA",
    size: "520 KB",
    modified: "Jan 30",
  },
  {
    id: "r4",
    name: "Promo Video",
    ext: "mp4",
    icon: "video",
    iconBg: "#FFF1F9",
    iconColor: "#EC4899",
    size: "312 MB",
    modified: "Jan 28",
  },
]

const allFilesData: FileItem[] = [
  {
    id: "f1",
    name: "Project Proposal",
    ext: "docx",
    icon: "doc",
    iconBg: "#EEF1FF",
    iconColor: "#5B7CFA",
    owner: "Alex Kim",
    size: "2.4 MB",
    modified: "10 min ago",
    starred: true,
    section: ["drive", "recent", "favorites"],
  },
  {
    id: "f2",
    name: "Q4 Presentation",
    ext: "pptx",
    icon: "slides",
    iconBg: "#FFF3E0",
    iconColor: "#FF6B35",
    owner: "You",
    size: "18.7 MB",
    modified: "1 hour ago",
    starred: false,
    section: ["drive", "recent", "shared"],
  },
  {
    id: "f3",
    name: "Marketing Brief",
    ext: "pdf",
    icon: "doc",
    iconBg: "#FCE8E8",
    iconColor: "#EF4444",
    owner: "Sarah Chen",
    size: "5.1 MB",
    modified: "3 hours ago",
    starred: true,
    section: ["drive", "recent", "favorites", "shared"],
  },
  {
    id: "f4",
    name: "Budget 2025",
    ext: "xlsx",
    icon: "sheet",
    iconBg: "#EEFAF5",
    iconColor: "#10B981",
    owner: "You",
    size: "890 KB",
    modified: "Yesterday",
    starred: false,
    section: ["drive", "recent", "offline"],
  },
  {
    id: "f5",
    name: "Campaign Photo",
    ext: "png",
    icon: "image",
    iconBg: "#F5EEFF",
    iconColor: "#A855F7",
    owner: "Marcus Lee",
    size: "12.3 MB",
    modified: "Yesterday",
    starred: false,
    section: ["drive", "recent", "shared"],
  },
  {
    id: "f6",
    name: "Product Demo",
    ext: "mp4",
    icon: "video",
    iconBg: "#FFF1F9",
    iconColor: "#EC4899",
    owner: "You",
    size: "204 MB",
    modified: "2 days ago",
    starred: true,
    section: ["drive", "recent", "favorites", "offline"],
  },
  {
    id: "f7",
    name: "Source Bundle",
    ext: "zip",
    icon: "inbox",
    iconBg: "#F0F0F0",
    iconColor: "#6B7280",
    owner: "Dev Team",
    size: "45.2 MB",
    modified: "3 days ago",
    starred: false,
    section: ["drive", "trash"],
  },
  {
    id: "f8",
    name: "Brand Soundtrack",
    ext: "mp3",
    icon: "music",
    iconBg: "#E8F5FF",
    iconColor: "#0EA5E9",
    owner: "Creative",
    size: "8.7 MB",
    modified: "Last week",
    starred: false,
    section: ["drive", "archive"],
  },
  {
    id: "f9",
    name: "Brand Guidelines",
    ext: "pdf",
    icon: "doc",
    iconBg: "#FFF3E0",
    iconColor: "#F97316",
    owner: "Design",
    size: "14.2 MB",
    modified: "4 days ago",
    starred: true,
    section: ["drive", "favorites", "shared"],
  },
  {
    id: "f10",
    name: "Team Contract",
    ext: "docx",
    icon: "lock",
    iconBg: "#EEF1FF",
    iconColor: "#5B7CFA",
    owner: "Legal",
    size: "1.1 MB",
    modified: "Jan 20",
    starred: false,
    section: ["drive", "archive", "shared"],
  },
  {
    id: "f11",
    name: "Old Mockups",
    ext: "fig",
    icon: "image",
    iconBg: "#F5EEFF",
    iconColor: "#A855F7",
    owner: "You",
    size: "22 MB",
    modified: "Dec 2024",
    starred: false,
    section: ["trash"],
  },
  {
    id: "f12",
    name: "Server Backup",
    ext: "zip",
    icon: "inbox",
    iconBg: "#E8F5FF",
    iconColor: "#0EA5E9",
    owner: "DevOps",
    size: "2.1 GB",
    modified: "Jan 5",
    starred: false,
    section: ["archive", "offline"],
  },
]

export const sectionMeta: Record<NavId, SectionMeta> = {
  drive: {
    title: "My Drive",
    subtitle: "All your files in one place",
    emptyIcon: "cloud",
    emptyMsg: "Your drive is empty",
    emptyDesc: "Upload files or create folders to get started.",
  },
  recent: {
    title: "Recent",
    subtitle: "Files you opened lately",
    emptyIcon: "clock",
    emptyMsg: "No recent files",
    emptyDesc: "Files you open will appear here.",
  },
  favorites: {
    title: "Favorites",
    subtitle: "Your starred files",
    emptyIcon: "star",
    emptyMsg: "No favorites yet",
    emptyDesc: "Star files to access them quickly.",
  },
  shared: {
    title: "Shared",
    subtitle: "Files shared with you",
    emptyIcon: "users",
    emptyMsg: "Nothing shared with you",
    emptyDesc: "Files others share will appear here.",
  },
  trash: {
    title: "Trash",
    subtitle: "Soft-deleted folders",
    emptyIcon: "trash",
    emptyMsg: "Trash is empty",
    emptyDesc: "Folders you delete will appear here until you delete them forever.",
  },
  archive: {
    title: "Archive",
    subtitle: "Long-term stored files",
    emptyIcon: "archive",
    emptyMsg: "No archived files",
    emptyDesc: "Move files here for long-term storage.",
  },
  offline: {
    title: "Offline",
    subtitle: "Available without internet",
    emptyIcon: "wifi",
    emptyMsg: "No offline files",
    emptyDesc: "Mark files for offline access on this device.",
  },
}

export const notifications: NotificationItem[] = [
  {
    id: 1,
    avatar: "AK",
    color: "#5B7CFA",
    text: "Alex Kim commented on Project Proposal",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    avatar: "SC",
    color: "#A855F7",
    text: "Sarah Chen shared Marketing Brief with you",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    avatar: "ML",
    color: "#F59E0B",
    text: "Marcus Lee edited Campaign Photo",
    time: "3h ago",
    unread: false,
  },
  {
    id: 4,
    avatar: "DT",
    color: "#10B981",
    text: "Dev Team uploaded Source Bundle.zip",
    time: "Yesterday",
    unread: false,
  },
]

export function getNavItems(): NavItem[] {
  return navItems
}

export function getQuickFolders(): QuickFolder[] {
  return quickFoldersData
}

export function getRootFiles(): RootFile[] {
  return rootFilesData
}

export function getAllFiles(): FileItem[] {
  return allFilesData
}

export function getFilesBySection(section: NavId, starredIds?: Set<string>): FileItem[] {
  if (section === "favorites") {
    const stars = starredIds ?? new Set(allFilesData.filter((f) => f.starred).map((f) => f.id))
    return allFilesData.filter((f) => stars.has(f.id))
  }
  return allFilesData.filter((f) => f.section.includes(section))
}

export function getSectionMeta(section: NavId): SectionMeta {
  return sectionMeta[section]
}

export function getNotifications(): NotificationItem[] {
  return notifications
}

export function getDefaultStarredIds(): Set<string> {
  return new Set(["f1", "f3", "f6", "f9"])
}

export function getFilesSectionTitle(section: NavId): string {
  switch (section) {
    case "drive":
      return "Recent Files"
    case "trash":
      return "Deleted Files"
    case "archive":
      return "Archived Files"
    case "offline":
      return "Available Offline"
    case "shared":
      return "Shared Files"
    case "favorites":
      return "Starred Files"
    default:
      return "All Files"
  }
}

const currentUser: UserAccount = {
  name: "Morgan Ellis",
  email: "morgan@cloudvault.io",
  initials: "ME",
  image: null,
  plan: "Pro Plan",
  storageLabel: "Pro Plan · 25 GB",
  storageUsedGb: 18,
  storageTotalGb: 25,
}

const accountMenuItems: AccountMenuItem[] = [
  {
    id: "profile",
    label: "View Profile",
    icon: "user",
    color: "#5B7CFA",
    href: "/account/profile",
    description: "Name, email, and public profile details",
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: "settings",
    color: "#8B90A7",
    href: "/account/settings",
    description: "Preferences, language, and connected apps",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "bell",
    color: "#F59E0B",
    href: "/account/notifications",
    description: "Email and in-app alert preferences",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: "lock",
    color: "#10B981",
    href: "/account/privacy",
    description: "Password, sessions, and sharing controls",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "help",
    color: "#A855F7",
    href: "/account/help",
    description: "Guides, FAQs, and contact support",
  },
]

export function getCurrentUser(): UserAccount {
  return currentUser
}

export function getAccountMenuItems(): AccountMenuItem[] {
  return accountMenuItems
}

export function getAccountMenuItem(tab: AccountTabId): AccountMenuItem {
  return accountMenuItems.find((item) => item.id === tab) ?? accountMenuItems[0]
}
