import { Separator } from "@/components/ui/common/Separator"
import { useSidebar } from "@/hooks/useSidebar"
import { cn } from "@/utils/tw-merge"

export function SidebarSkeleton({
  header,
  nav,
  footer,
}: {
  header?: React.ReactNode
  nav: React.ReactNode
  footer?: React.ReactNode
}) {
  const { isCollapsed } = useSidebar()

  return (
    <aside
      className={cn(
        'fixed left-0 top-18.75 z-40 h-[calc(100vh-4.6875rem)]',
        'bg-card border-r border-border',
        'transition-[width] duration-200 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {header && <div className="p-2">{header}</div>}
        <Separator />
        <div className="p-2">{nav}</div>
        <Separator />
        {footer && <div className="p-2">{footer}</div>}
      </div>
    </aside>
  )
}
