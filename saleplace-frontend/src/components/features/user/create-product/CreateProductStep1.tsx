'use client'

import { Heading } from "@/components/ui/elements/Heading"
import { useTranslations } from "next-intl"
import { CategorySelect } from "../../category/CategorySelect"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProductSchema, TypeCreateProductSchema } from "@/schemas/create-product/create-product.schema"
import { useCreateProductMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { Textarea } from "@/components/ui/common/Textarea"
import { Button } from "@/components/ui/common/Button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"
import { CreateProductStep1Skeleton } from "./ProductSkeleton"


export function CreateProductStep1() {

    const t = useTranslations('dashboard.product.step1')
    const { isLoadingProfile } = useCurrent()
    const router = useRouter()

    const form = useForm<TypeCreateProductSchema>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: undefined,
            categoryId: "",
        },
    });

    const [createProduct, { loading: loadingCreateProduct }] = useCreateProductMutation({
        onCompleted(data) {
            const productId = data?.createProduct?.id;

            if (productId) {
                router.push(`/dashboard/create-product?step=2&productId=${productId}`);
            }
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    });

    const onSubmit = async (values: TypeCreateProductSchema) => {
        await createProduct({
            variables: {
                data: values,
            },
        });
    };

    const { isValid, isDirty } = form.formState

    if (isLoadingProfile) return <CreateProductStep1Skeleton />

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10">
            <Heading
                title={t('header.heading')}
                description={t('header.description')}
            />

            <div className="mt-5">
                <FormWrapper heading={t('heading')}>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-y-4"
                        >

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="px-5">
                                        <FormLabel>{t("title.label")}</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("title.placeholder")}
                                                type="text"
                                                disabled={loadingCreateProduct}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            {t("title.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="px-5">
                                        <FormLabel>{t("price.label")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                step="0.01"
                                                placeholder={t("price.placeholder")}
                                                disabled={loadingCreateProduct}
                                                onWheel={(e) => e.currentTarget.blur()}
                                                value={field.value ?? ""}
                                                onChange={(e) => {
                                                    const val = e.target.value;

                                                    if (val === "") {
                                                        field.onChange(undefined);
                                                        return
                                                    }

                                                    const num = Number(val);
                                                    field.onChange(Number(num.toFixed(2)));
                                                }}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            {t("price.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="px-5">
                                        <FormLabel>{t("description.label")}</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder={t("description.placeholder")}
                                                disabled={loadingCreateProduct}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            {t("description.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className="px-5 w-full">
                                        <FormLabel>{t("category.label")}</FormLabel>

                                        <FormControl className="w-full">
                                            <CategorySelect
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>

                                        <FormDescription>
                                            {t("category.description")}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-start p-5 pb-1">
                                <Button
                                    disabled={!isValid || !isDirty || loadingCreateProduct}
                                >
                                    {t("submitButton")}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </FormWrapper>
            </div>
        </div>
    );
}