'use client'

import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { Heading } from "@/components/ui/elements/Heading"
import { ProductStatus, useGetOneProductStep3Query, useGetOneQuery, useUpdateProdcutMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/common/Form"
import { PRODUCT_STATUS, TypeUpdateProductSchema, updateProductSchema } from "@/schemas/create-product/update-product.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/common/Input"
import { Textarea } from "@/components/ui/common/Textarea"
import { CategorySelect } from "../../category/CategorySelect"
import { Button } from "@/components/ui/common/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/common/Select"
import { ProductImagesManager } from "./ProductImagesManager"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"
import { CreateProductStep3Skeleton } from "./ProductSkeleton"
import { DeleteProductButton } from "./DeleteProdcut"

type Props = {
  productId: string
}

const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "DELETED", label: "Deleted" },
]

export function CreateProductStep3({ productId }: Props) {

  const t = useTranslations('dashboard.product.step3')
  const { isLoadingProfile } = useCurrent()
  const router = useRouter()

  if (!productId) {
    router.push('/dashboard/create-product')
  }

  const { data, loading: isLoadingProduct } = useGetOneProductStep3Query({
    variables: { id: productId }
  })

  const form = useForm<TypeUpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      categoryId: "",
      status: ProductStatus.Draft
    },
  });

  useEffect(() => {
    if (data?.getOne) {
      form.reset({
        productId: data.getOne.id,
        title: data.getOne.title,
        description: data.getOne.description,
        price: data.getOne.price,
        categoryId: data.getOne.category?.id,
        status: data.getOne.status,
      })
    }
  }, [data?.getOne, form])


  const [updateProduct, { loading: isLoadingUpdateProduct }] = useUpdateProdcutMutation({
    onCompleted() {
      router.push(`/products/${data?.getOne.id}-${data?.getOne.slug}`)
    },
    onError(error) {
      toast.error(t(parseApolloMessage(error).code))
    }
  })

  const onSubmit = async (values: TypeUpdateProductSchema) => {
    await updateProduct({
      variables: {
        data: values,
      },
    });
  };

  const { isValid } = form.formState

  const isDeleted = data?.getOne?.status === ProductStatus.Deleted

  if (isLoadingProduct || !data?.getOne) {
    return <CreateProductStep3Skeleton />
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      <Heading
        title={t('header.heading')}
        description={t('header.description')}
      />

      <div className="mt-5">
        <FormWrapper
          heading={t('heading')}>

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
                        disabled={isLoadingProduct || isDeleted}
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
                        disabled={isLoadingProduct || isDeleted}
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
                        disabled={isLoadingProduct || isDeleted}
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
                        defaultParentId={data?.getOne.category?.parentId!}
                        disabled={isDeleted}
                      />
                    </FormControl>

                    <FormDescription>
                      {t("category.description")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="px-5">
                    <FormLabel>{t("status.label")}</FormLabel>

                    <Select
                      key={field.value}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      disabled={isLoadingProduct || isDeleted}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("status.placeholder")} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={1}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {t(`status.options.${status.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      {t("status.description")}
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="px-5">
                <p>{t('reorderInfo')}</p>
                <ProductImagesManager
                  productId={data?.getOne?.id ?? ''}
                  images={data?.getOne?.images ?? []}
                  disabled={isDeleted}
                />
              </div>

              <div className="flex justify-start  pb-1">
                {isDeleted ? (
                  <div className="p-5 text-red-500">
                    {t('deletedProduct')}
                  </div>
                ) : (
                  <div className="flex justify-start gap-3 p-5 pb-1">
                    <Button
                      disabled={!isValid || isLoadingProduct || isLoadingUpdateProduct}
                    >
                      {t("submitButton")}
                    </Button>
                    <DeleteProductButton productId={productId} />
                  </div>
                )}
              </div>
            </form>
          </Form>
        </FormWrapper>
      </div>
    </div>
  )
}
