'use client'

import { ReviewModel, useUpdateReviewMutation } from "@/graphql/generated/output"
import { useForm } from "react-hook-form"
import { StarRating } from "./CreateReviewForm"
import { Textarea } from "@/components/ui/common/Textarea"
import { Button } from "@/components/ui/common/Button"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateReviewInputSchema } from "@/schemas/review/update-review-input.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"

type EditProps = {
    review: ReviewModel
    onCancel: () => void
    onSuccess: () => void
}

export function EditReviewForm({ review, onCancel, onSuccess }: EditProps) {

    const t = useTranslations('dashboard.product.editProduct')
    const [updateReview, { loading }] = useUpdateReviewMutation({

    })

    const form = useForm({
        resolver: zodResolver(updateReviewInputSchema),
        defaultValues: {
            rating: review.rating ?? 5,
            comment: review.comment ?? "",
        },
    })


    const onSubmit = async (values: any) => {

        try {
            await updateReview({
                variables: {
                    data: {
                        reviewId: review.id,
                        ...values,
                    },
                },
                optimisticResponse: {
                    editReview: {
                        __typename: "ReviewModel",
                        id: review.id,
                        rating: values.rating,
                        comment: values.comment,
                        createdAt: review.createdAt,

                        user: {
                            __typename: "PublicUserModel",
                            id: review.user.id,
                            username: review.user.username,
                            displayName: review.user.displayName,
                            avatar: review.user.avatar,
                            avatarType: review.user.avatarType,
                        },
                    },
                },
            })
            toast.success(t('successMessage'))
            onSuccess()
        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        }

    }

    const { isValid, isDirty } = form.formState

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
            >

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">
                                {t('labelRating')}
                            </FormLabel>
                            <FormControl>
                                <StarRating
                                    value={Number(field.value)}
                                    onChange={field.onChange}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">
                                {t('labelCommnet')}
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder={t('placeholderComment')}
                                    className="min-h-30 resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <Button
                        type="submit"
                        disabled={!isValid || !isDirty || loading}
                        className="px-3 py-1"
                        size='sm'
                    >
                        {t('buttonSubmit')}
                    </Button>

                    <Button
                        type="button"
                        onClick={onCancel}
                        className="px-3 py-1"
                        size='sm'
                        variant='outline'
                    >
                        {t('buttonCancel')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}