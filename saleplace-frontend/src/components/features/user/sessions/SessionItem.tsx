import { CardContainer } from "@/components/ui/elements/CardContainer";
import { useRemoveSessionMutation, type FindSessionsByUserQuery } from "@/graphql/generated/output";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/common/Button";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";
import { parseApolloMessage } from "@/utils/gqlError";
import { SessionModal } from "./SessionModal";
import { getDeviceIcon } from "@/utils/get-device-icon";
import { useState } from "react";

type SessionType = NonNullable<
    FindSessionsByUserQuery['findSessionsByUser']
>[number];

interface SessionItemProps {
    session: SessionType
    isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {

    const t = useTranslations('dashboard.settings.sessions.sessionItem')
    const [open, setOpen] = useState(false)

    const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
        update(cache, { data }) {
            if (!data?.removeSession.success) return

            cache.evict({
                id: cache.identify({
                    __typename: 'SessionModel',
                    id: data.removeSession.removedSessionId
                })
            })

            cache.gc()
        },
        onCompleted() {
            toast.success(t('successMessage'))
            setOpen(false)
        },
        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    const handleClick = () => {
        setOpen(true)
    }

    const handleConfirm = async () => {
        await remove({ variables: { id: session?.id } })
    }

    const Icon = getDeviceIcon(session?.metadata?.device.type)

    return (
        <CardContainer
            heading={`${session?.metadata.device.browser}, ${session?.metadata.device.os}`}
            description={`${session?.metadata.location.country}, ${session?.metadata.location.city}`}
            Icon={Icon}
            rightContent={
                <div className='flex items-center gap-x-4'>
                    
                    {!isCurrentSession && (
                        <Button
                            variant='secondary'
                            disabled={isLoadingRemove}
                            onClick={handleClick}
                        >
                            {t('deleteButton')}
                        </Button>
                    )}

                    <ConfirmModal
                        open={open}
                        onOpenChange={setOpen}
                        heading={t('confirmModal.heading')}
                        message={t('confirmModal.message')}
                        onConfirm={handleConfirm}
                    />

                    <SessionModal session={session}>
                        <Button>{t('detailsButton')}</Button>
                    </SessionModal>

                </div>
            }
        />
    )
}