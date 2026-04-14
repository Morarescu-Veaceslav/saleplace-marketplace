import { Button } from "@/components/ui/common/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { useUpdateSocialLinkMutation, type SocialLinksQuery } from "@/graphql/generated/output";
import { socialLinksSchema, type TypeSocialLinksSchema } from "@/schemas/user/social-links.schema";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, PencilIcon, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RemoveSocialLink } from "./RemoveSocialLink";

interface SocialLinkItemProps {
    socialLink: SocialLinksQuery['socialLinks'][number]
    provided: DraggableProvided
}

export function SocialLinkItem({ socialLink, provided }: SocialLinkItemProps) {

    const t = useTranslations('dashboard.settings.profile.socialLinks.editForm')

    const [isEditingId, setIsEditingId] = useState<string | null>(null)


    const form = useForm<TypeSocialLinksSchema>({
        resolver: zodResolver(socialLinksSchema),
        values: {
            title: socialLink.title ?? '',
            url: socialLink.url ?? ''
        }
    })

    const { isValid, isDirty, } = form.formState

    function toggleEditing(id: string | null) {
        setIsEditingId(id)
        form.reset()
    }


    const [update, { loading: isLoadingUpdate }] = useUpdateSocialLinkMutation({

        update(cache, { data }) {
            if (!data?.updateSocialLink) return

            cache.modify({
                id: cache.identify(data.updateSocialLink),
                fields: {
                    title() {
                        return data.updateSocialLink.title
                    },
                    url() {
                        return data.updateSocialLink.url
                    }
                }
            })
        },

        onCompleted() {
            toggleEditing(null)
            toast.success(t('successUpdateMessage'))
        },
        onError(error) {
            console.log(error)
            toast.error(t('errorUpdateMessage'))
        }
    })

    function onSubmit(data: TypeSocialLinksSchema) {
        update({ variables: { id: socialLink.id, data } })
    }

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-md border border-border bg-background text-sm p-2"
        >

            <div
                {...provided.dragHandleProps}
                className="shrink-0 rounded-md border border-border px-2 py-2 sm:py-4 text-foreground cursor-grab"
            >
                <GripVertical className="size-5" />
            </div>

            <div className="flex-1 w-full sm:w-auto space-y-1 px-2">
                {isEditingId === socialLink.id ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center"
                        >
                            <div className="flex-1 space-y-2 w-full">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder={t("titlePlaceholder")}
                                                    disabled={isLoadingUpdate}
                                                    className="h-8 w-full"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder={t("urlPlaceholder")}
                                                    disabled={isLoadingUpdate}
                                                    className="h-8 w-full wrap-break-word"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
                                <Button
                                    onClick={() => toggleEditing(null)}
                                    variant="secondary"
                                    className="w-full sm:w-auto"
                                >
                                    {t("cancelButton")}
                                </Button>
                                <Button
                                    disabled={isLoadingUpdate || !isDirty || !isValid}
                                    className="w-full sm:w-auto"
                                >
                                    {t("submitButton")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <>
                        <h2 className="text-[15px] font-semibold text-foreground">
                            {socialLink.title}
                        </h2>
                        <p className="text-muted-foreground wrap-break-word">{socialLink.url}</p>
                    </>
                )}
            </div>

            <div className="flex mt-2 sm:mt-0 ml-auto items-center gap-2 sm:gap-2">
                {isEditingId !== socialLink.id && (
                    <Button onClick={() => toggleEditing(socialLink.id)} variant="ghost" size="lg">
                        <PencilIcon className="size-4 text-muted-foreground" />
                    </Button>
                )}
                <RemoveSocialLink socialLinkId={socialLink.id} />
            </div>
        </div>
    );
}
