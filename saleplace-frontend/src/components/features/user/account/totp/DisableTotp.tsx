import { Button } from "@/components/ui/common/Button"
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { useDisableTotpMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { client } from "@/libs/apollo-client"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function DisableTotp() {

    const translation = useTranslations('dashboard.settings.account.twoFactor.disabled')

    const [disable, { loading: isLoadingDisable }] = useDisableTotpMutation({
        onCompleted(data) {
            if (!data?.disableTotp) return;
            client.cache.modify({
                id: client.cache.identify({
                    __typename: 'UserModel',
                    id: data.disableTotp.id
                }),
                fields: {
                    isTotpEnabled() {
                        return data.disableTotp.isTotpEnabled
                    }
                }
            });
            toast.success(translation('successMessage'))
        },
        onError() {
            toast.error(translation('errorMessage'))
        }
    })

    return <ConfirmModal
        heading={translation('heading')}
        message={translation('message')}
        onConfirm={() => disable()}
    >
        <Button variant='secondary' disabled={isLoadingDisable}>{translation('trigger')}</Button>
    </ConfirmModal>
}