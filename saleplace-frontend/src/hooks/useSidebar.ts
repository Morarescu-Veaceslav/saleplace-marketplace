
import { sidebarStore } from "@/store/sidebar/sidebar.store"

export const useSidebar = () => {
    const isCollapsed = sidebarStore(state => state.isCollapsed)
    const setCollapsed = sidebarStore(state => state.setCollapsed)

    const open = () => setCollapsed(false)
    const close = () => setCollapsed(true)

    return { isCollapsed, open, close }
}
