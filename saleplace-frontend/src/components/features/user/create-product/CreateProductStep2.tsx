'use client'

import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { Heading } from "@/components/ui/elements/Heading"
import { useCurrent } from "@/hooks/useCurrent"
import { API_URL } from "@/libs/constants/url.constants"
import { TypeUploadProductImagesSchema, uploadProductImagesSchema } from "@/schemas/create-product/upload-product-images.schema"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { ImagesDnD } from "./ImagesDnD"
import { parseApolloMessage } from "@/utils/gqlError"
import { CreateProductStep2Skeleton } from "./ProductSkeleton"

type Props = {
    productId: string
}

type UploadFileItem = {
    id: string
    file: File
}
export function CreateProductStep2({ productId }: Props) {

    const t = useTranslations('dashboard.product.step2')
    const { isLoadingProfile } = useCurrent()
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const form = useForm<TypeUploadProductImagesSchema>({
        resolver: zodResolver(uploadProductImagesSchema),
        defaultValues: {
            files: [],
        },
    })

    const files = useWatch({
        control: form.control,
        name: 'files',
    }) as UploadFileItem[]

    const isFileSelected = files && files.length > 0

    const previews = useMemo(() => {
        return files.map(item => ({
            id: item.id,
            src: URL.createObjectURL(item.file),
        }))
    }, [files])

    useEffect(() => {
        return () => {
            previews.forEach(p => URL.revokeObjectURL(p.src))
        }
    }, [previews])

    const handleDelete = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index)
        form.setValue('files', newFiles)
    }

    if (!productId) {
        router.push('/dashboard/create-product')
    }

    const upload = async () => {
        if (!files.length) return

        try {
            const formData = new FormData()

            files.forEach((item, index) => {
                formData.append('files', item.file)
                formData.append('positions', index.toString())
            })

            formData.append('productId', productId)

            const res = await fetch(`${API_URL}/api/upload/product-images`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(t(`${data.code ?? 'UNKNOWN'}`))
                return
            }
            router.push(`/dashboard/create-product?step=3&productId=${productId}`)

        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    }

    const items = previews.map(p => ({
        id: p.id,
        src: p.src,
    }))

    if (isLoadingProfile) return <CreateProductStep2Skeleton />

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10">
            <Heading
                title={t('header.heading')}
                description={t('header.description')}
            />

            <div className="mt-5">
                <FormWrapper heading={t('heading')}>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="files"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="px-1 pb-5">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex gap-3 flex-wrap">
                                                    <Input
                                                        ref={inputRef}
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const selectedFiles = Array.from(e.target.files || [])

                                                            const mapped = selectedFiles.map(file => ({
                                                                id: crypto.randomUUID(),
                                                                file,
                                                            }))

                                                            const newFiles = [...files, ...mapped]

                                                            const result = uploadProductImagesSchema.safeParse({
                                                                files: newFiles,
                                                            })

                                                            if (!result.success) {
                                                                const issue = result.error.issues[0]

                                                                form.setError("files", {
                                                                    type: "manual",
                                                                    message: t(`errors.${issue.message}`),
                                                                })

                                                                return
                                                            }

                                                            form.clearErrors("files")
                                                            field.onChange(newFiles)
                                                        }}

                                                    />

                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => inputRef.current?.click()}
                                                    >
                                                        {t('selectButton')}
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        disabled={!isFileSelected}
                                                        onClick={upload}
                                                    >
                                                        {t('updateButton')}
                                                    </Button>
                                                </div>

                                                <p className="text-sm text-muted-foreground">
                                                    {t('info')}
                                                </p>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </FormWrapper>

                {files.length > 1 && (
                    <p className="text-sm text-muted-foreground mt-3">
                        {t('reorderInfo')}
                    </p>
                )}
                <ImagesDnD
                    items={items}
                    onDelete={handleDelete}
                    onReorder={(from, to) => {
                        const updated = Array.from(files)
                        const [moved] = updated.splice(from, 1)
                        updated.splice(to, 0, moved)
                        form.setValue('files', updated)
                    }}
                    showMainBadge
                />

            </div>
        </div>
    )
}