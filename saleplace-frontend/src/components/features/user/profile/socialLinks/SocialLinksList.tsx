import { useReorderSocialLinksMutation, useSocialLinksQuery } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { useTranslations } from "next-intl"
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd'
import { Separator } from "@/components/ui/common/Separator"
import { SocialLinkItem } from "./SocialLinkItem"
import { toast } from "sonner"

export function SocialLinksList() {

    const t = useTranslations('dashboard.settings.profile.socialLinks')
    const { user } = useCurrent()

    const { data } = useSocialLinksQuery({
        variables: { username: user?.username! },
        skip: !user?.username,
    })
    const socialLinks = data?.socialLinks ?? []

    const [reorder] = useReorderSocialLinksMutation({

        onCompleted() {
            toast.success(t('successReorderMessage'))
        },
        onError() {
            toast.error(t('errorReorderMessage'))
        }
    })


    function onDragEnd(result: DropResult) {
        if (!result.destination) return

        const reordered = Array.from(socialLinks)
        const [moved] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, moved)

        const orderPayload = reordered.map((item, index) => ({
            id: item.id,
            position: index,
        }))

        reorder({
            variables: { list: orderPayload },

            optimisticResponse: {
                reorderSocialLinks: true,
            },

            update(cache) {
                cache.modify({
                    fields: {
                        socialLinks(existingRefs = [], { readField }) {
                            const positionMap = new Map(
                                orderPayload.map(item => [item.id, item.position])
                            )

                            return [...existingRefs].sort((a, b) => {
                                const idA = readField<string>('id', a)
                                const idB = readField<string>('id', b)

                                if (!idA || !idB) return 0

                                return (positionMap.get(idA) ?? 0) - (positionMap.get(idB) ?? 0)
                            })
                        },
                    },
                })
            },
        })
    }

    if (!socialLinks.length) return null

    return <>
        <Separator className="m-3" />
        <div className="px-5 my-5">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="socialLinks">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {socialLinks.map((socialLink, index) => (
                                <Draggable key={socialLink.id} draggableId={socialLink.id} index={index}>
                                    {provided => (
                                        <SocialLinkItem key={index} socialLink={socialLink} provided={provided} />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    </>
}