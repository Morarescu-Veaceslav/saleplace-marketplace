'use client'

import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form"
import { Textarea } from "@/components/ui/common/Textarea"
import { Heading } from "@/components/ui/elements/Heading"
import { useCreateReviewMutation } from "@/graphql/generated/output"
import { createReviewInputSchema, TypeCreateReviewInputSchema } from "@/schemas/review/create-review-input.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    productId: string
}

export function CreateReviewForm({ productId }: Props) {

    const t = useTranslations('dashboard.product.review')

    const [createReview, { loading: loadingCreateReview }] = useCreateReviewMutation({
        update(cache, { data }) {
            const newReview = data?.createReview
            if (!newReview) return
            if (!productId) return
            cache.modify({
                id: cache.identify({
                    __typename: "ProductModel",
                    id: productId,
                }),
                fields: {
                    reviews(existingRefs = []) {
                        return [newReview, ...existingRefs]
                    },
                    reviewsCount(count = 0) {
                        return count + 1
                    },
                },
            })
        },
    })

    const form = useForm({
        resolver: zodResolver(createReviewInputSchema),
        defaultValues: {
            productId,
            rating: 5,
            comment: "",
        },
    })

    const onSubmit = async (values: TypeCreateReviewInputSchema) => {
        try {
            await createReview({
                variables: {
                    data: values,
                },
            })

            toast.success(t('reviewAdded'))
            form.reset({ ...values, comment: "", rating: 5 })

        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    }
    const { isValid, isSubmitting } = form.formState

    return (
        <div className="mt-10 border rounded-xl p-6 bg-white shadow-sm">

            <div className="mb-6">
                <Heading
                    title={t('header')}
                    description={t('description')}
                    size="sm"
                />
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
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

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={
                                !isValid ||
                                isSubmitting ||
                                loadingCreateReview
                            }
                            className="min-w-45"
                        >
                            {t('submitButton')}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
}

type RatingProps = {
    value: number
    onChange: (value: number) => void
}

export function StarRating({ value, onChange }: RatingProps) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Button
                    type='button'
                    variant='ghost'
                    key={star}
                    onClick={() => onChange(star)}
                >
                    <Star
                        size={20}
                        className={
                            star <= value
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }
                    />
                </Button>
            ))}
        </div>
    )
}