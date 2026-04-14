import { Button } from "@/components/ui/common/Button"
import { useRemoveSocialLinkMutation } from "@/graphql/generated/output"
import { Reference } from "@apollo/client"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"


interface RemoveSocialLinkProps {
    socialLinkId: string;
}
export function RemoveSocialLink({ socialLinkId }: RemoveSocialLinkProps) {

    const t = useTranslations('dashboard.settings.profile.socialLinks.editForm')
    const [remove, { loading: isLoadingRemove }] = useRemoveSocialLinkMutation({

        variables: { id: socialLinkId },
        optimisticResponse: {
            removeSocialLink: true,
        },

        update(cache) {
            cache.modify({
                fields: {
                    socialLinks(existing = [], { readField }) {
                        return existing.filter(
                            (ref: Reference) => readField<string>('id', ref) !== socialLinkId
                        )
                    },
                },
            })
        },
        onCompleted() {
            toast.success(t('successRemoveMessage'))
        },
        onError() {
            toast.error(t('errorRemoveMessage'))
        }
    })


    return (
        <Button
            onClick={() => remove()}
            disabled={isLoadingRemove}
            variant='ghost'
            size='lg'>
            <Trash2 className='size-4 text-muted-foreground' />
        </Button>
    )
}