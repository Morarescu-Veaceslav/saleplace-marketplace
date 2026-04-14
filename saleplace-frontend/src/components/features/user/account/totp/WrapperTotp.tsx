'use client'

import { useCurrent } from "@/hooks/useCurrent"
import { useTranslations } from "next-intl"
import { WrapperTotpSkeleton } from "./WrapperTotpSkeleton"
import { CardContainer } from "@/components/ui/elements/CardContainer"
import { DisableTotp } from "./DisableTotp"
import { EnableTotp } from "./EnableTotp"

export function WrapperTotp() {

    const t = useTranslations('dashboard.settings.account.twoFactor')
    const { user, isLoadingProfile } = useCurrent()

    if (isLoadingProfile) return <WrapperTotpSkeleton />

    return (
        <CardContainer
            heading={t('heading')}
            description={t('description')}
            rightContent={<div className="flex items-center gap-x-4">
                {!user?.isTotpEnabled ? < EnableTotp /> : <DisableTotp />}
            </div>}
        />
    )
}