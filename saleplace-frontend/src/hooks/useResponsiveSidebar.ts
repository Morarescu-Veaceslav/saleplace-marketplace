import { useEffect } from "react"
import { useMediaQuery } from "./useMediaQuery"
import { useSidebar } from "./useSidebar"

export function useResponsiveSidebar() {

  const isMobile = useMediaQuery('(max-width: 1024px)')
  const { isCollapsed, open, close } = useSidebar()

  useEffect(() => {

    if (isMobile) {
      if (!isCollapsed) close()
    } else {
      if (isCollapsed) open()
    }

  }, [isMobile])

}
