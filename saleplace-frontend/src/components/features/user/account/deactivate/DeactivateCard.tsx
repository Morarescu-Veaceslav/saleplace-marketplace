'use client'

import { Button } from "@/components/ui/common/Button"
import { CardContainer } from "@/components/ui/elements/CardContainer"
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function DeactivateCard() {

    const t = useTranslations('dashboard.settings.account.deactivation')
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <CardContainer
            heading={t('heading')}
            description={t('description')}
            rightContent={
                <div className="flex items-center gap-x-4">
                    <Button
                        variant="destructive"
                        onClick={() => setOpen(true)}
                    >
                        {t('button')}
                    </Button>

                    <ConfirmModal
                        open={open}
                        onOpenChange={setOpen}
                        heading={t('confirmModal.heading')}
                        message={t('confirmModal.message')}
                        onConfirm={() => {
                            setOpen(false)
                            router.push('/deactivate')
                        }}
                    />
                </div>
            }
        />
    )
}