import { Button } from '@/components/ui/common/Button'
import { Separator } from '@/components/ui/common/Separator'
import { Hint } from '@/components/ui/elements/Hint'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/tw-merge'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'


export function SidebarHeaderToggle() {
    const t = useTranslations('layout.header.sidebar.header')
    const { isCollapsed, close, open } = useSidebar()

    const isMobile = useMediaQuery('(max-width: 1024px)')

    if (isMobile) {
        return null
    }

    if (isCollapsed) {
        return (
            <div className="p-2">
                <Hint label={t('expand')} side="right" asChild>
                    <Button
                        onClick={open}
                        variant="ghost"
                        size="icon"
                        className="h-11 w-full justify-center hover:bg-accent"
                    >
                        <ArrowRightCircle className="size-5" />
                    </Button>
                </Hint>
            </div>
        )
    }

    return (
        <>
            <Separator />
            <div className="mb-2 flex w-full items-center justify-between p-3 pl-4">

                <h2 className="text-md font-semibold text-foreground">
                    {t('navigation')}
                </h2>

                <Hint label={t('collapse')} side="right" asChild>
                    <Button
                        onClick={close}
                        variant="ghost"
                        size="icon"
                    >
                        <ArrowLeftCircle className="size-5" />
                    </Button>
                </Hint>
            </div>
        </>
    )
}
