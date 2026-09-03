"use client"

import type { ReactNode } from "react"
import type { NavId } from "@/types"
import { useDashboard } from "@/hooks/useDashboard"
import { useFolders } from "@/hooks/useFolders"
import { useFiles } from "@/hooks/useFiles"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Sidebar } from "@/components/layout/Sidebar"
import { RightSidebar } from "@/components/layout/RightSidebar"
import { Header } from "@/components/layout/Header"
import { StatusBar } from "@/components/layout/StatusBar"
import { SectionContent } from "@/components/files/SectionContent"
import { ModalsHost } from "@/components/layout/ModalsHost"
import { addFileCounts } from "@/lib/files/map"

export function DashboardShell({ section, children }: { section?: NavId; children?: ReactNode }) {
  const {
    viewMode,
    setViewMode,
    sortBy,
    sortAscending,
    toggleSortColumn,
    starredFiles,
    toggleStar,
    selectedFolder,
    setSelectedFolder,
    sidebarOpen,
    setSidebarOpen,
    rightOpen,
    setRightOpen,
    rightSidebarVisible,
    setRightSidebarVisible,
    modal,
    setModal,
    openShare,
    openPreview,
    openContextMenu,
    openFolder,
    openEmptyTrash,
    profileRef,
    bellRef,
    filterRef,
    sortRef,
  } = useDashboard()
  const { currentFolders, trashFolders, trashCount: folderTrashCount, breadcrumbs, goToFolder } = useFolders()
  const { currentFiles, trashFiles, recentFiles, trashCount: fileTrashCount, files } = useFiles()
  const trashCount = folderTrashCount + fileTrashCount
  const driveFolders = addFileCounts(currentFolders, files, false)
  const trashFoldersWithFiles = addFileCounts(trashFolders, files, true)

  const { isMobile, isTablet, hideSidebars } = useMediaQuery()
  const showRight = hideSidebars ? true : rightSidebarVisible

  return (
    <div
      style={{
        display: "flex",
        height: "100dvh",
        background: "#F4F6FA",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {hideSidebars && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,29,46,0.35)",
            backdropFilter: "blur(3px)",
            zIndex: 40,
          }}
        />
      )}
      {hideSidebars && rightOpen && (
        <div
          onClick={() => setRightOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,29,46,0.35)",
            backdropFilter: "blur(3px)",
            zIndex: 40,
          }}
        />
      )}

      <aside
        className="sidebar-glass"
        style={{
          width: 264,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          padding: "28px 20px",
          overflowY: "auto",
          zIndex: hideSidebars ? 50 : 10,
          position: hideSidebars ? "fixed" : "relative",
          top: hideSidebars ? 0 : undefined,
          left: hideSidebars ? 0 : undefined,
          bottom: hideSidebars ? 0 : undefined,
          height: hideSidebars ? "100dvh" : undefined,
          transform: hideSidebars ? (sidebarOpen ? "translateX(0)" : "translateX(-100%)") : undefined,
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <Sidebar
          activeNav={section ?? "drive"}
          onNew={() => setModal("new")}
          onClose={() => setSidebarOpen(false)}
          isDrawer={hideSidebars}
        />
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <Header
          isMobile={isMobile}
          hideSidebars={hideSidebars}
          modal={modal}
          rightSidebarVisible={rightSidebarVisible}
          onOpenSidebar={() => setSidebarOpen(true)}
          onOpenRight={() => setRightOpen(true)}
          onToggleRight={() => setRightSidebarVisible(!rightSidebarVisible)}
          onToggleModal={setModal}
          profileRef={profileRef}
          bellRef={bellRef}
        />

        {section ? (
          <SectionContent
            section={section}
            viewMode={viewMode}
            sortBy={sortBy}
            sortAscending={sortAscending}
            onSortColumn={toggleSortColumn}
            modal={modal}
            isMobile={isMobile}
            isTablet={isTablet}
            starredFiles={starredFiles}
            selectedFolderId={selectedFolder.id}
            driveFolders={driveFolders}
            trashFolders={trashFoldersWithFiles}
            trashCount={trashCount}
            driveFiles={currentFiles}
            trashFiles={trashFiles}
            recentFiles={recentFiles}
            breadcrumbs={breadcrumbs}
            filterRef={filterRef}
            sortRef={sortRef}
            onSetModal={setModal}
            onSetViewMode={setViewMode}
            onToggleStar={toggleStar}
            onSelectFolder={(folder) => {
              setSelectedFolder(folder)
              if (hideSidebars) setRightOpen(true)
              else if (!rightSidebarVisible) setRightSidebarVisible(true)
            }}
            onOpenFolder={(folder) => {
              openFolder(folder)
              if (hideSidebars) setRightOpen(true)
              else if (!rightSidebarVisible) setRightSidebarVisible(true)
            }}
            onGoToFolder={goToFolder}
            onEmptyTrash={openEmptyTrash}
            onOpenPreview={openPreview}
            onOpenShare={openShare}
            onOpenContextMenu={openContextMenu}
          />
        ) : (
          children
        )}

        <StatusBar isMobile={isMobile} />
      </div>

      {showRight && (
        <aside
          className="sidebar-right"
          style={{
            width: 288,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            padding: "28px 22px",
            overflowY: "auto",
            zIndex: hideSidebars ? 50 : 10,
            position: hideSidebars ? "fixed" : "relative",
            top: hideSidebars ? 0 : undefined,
            right: hideSidebars ? 0 : undefined,
            bottom: hideSidebars ? 0 : undefined,
            height: hideSidebars ? "100dvh" : undefined,
            transform: hideSidebars ? (rightOpen ? "translateX(0)" : "translateX(100%)") : undefined,
            transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <RightSidebar
            folder={selectedFolder}
            onClose={() => {
              if (hideSidebars) setRightOpen(false)
              else setRightSidebarVisible(false)
            }}
            onShare={openShare}
          />
        </aside>
      )}

      <ModalsHost />
    </div>
  )
}
