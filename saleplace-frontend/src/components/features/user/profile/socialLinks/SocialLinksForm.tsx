import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { Separator } from "@/components/ui/common/Separator"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { useCreateSocialLinkMutation, useSocialLinksQuery } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { socialLinksSchema, type TypeSocialLinksSchema } from "@/schemas/user/social-links.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { SocialLinksFormSkeleton } from "./SocialLinksSkeleton"
import { SocialLinksList } from "./SocialLinksList"
import { gql, Reference } from "@apollo/client"


export function SocialLinksForm() {

    const translation = useTranslations('dashboard.settings.profile.socialLinks.createForm')
    const { isLoadingProfile } = useCurrent()
  
    const form = useForm<TypeSocialLinksSchema>({
        resolver: zodResolver(socialLinksSchema),
        defaultValues: {
            title: '',
            url: ''
        }
    })

    const [create, { loading: isLoadingCreate }] = useCreateSocialLinkMutation({
        onCompleted() {
            form.reset()
            toast.success(translation('successMessage'))
        },
        update(cache, { data }) {
            if (!data?.createSocialLink) return;

            const newLink = data.createSocialLink;

            cache.modify({
                fields: {
                    socialLinks(existing = [], { readField }) {
                        const exists = existing.some(
                            (ref: Reference) => readField('id', ref) === newLink.id
                        );
                        if (exists) return existing;

                        const newRef = cache.writeFragment({
                            data: newLink,
                            fragment: gql`
                        fragment NewPublicSocialLinkModel on PublicSocialLinkModel {
                            id
                            title
                            position
                        }`
                        });

                        return [...existing, newRef];
                    },
                },
            });
        },

        onError() {
            toast.error(translation('errorMessage'))
        }
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeSocialLinksSchema) {
        create({ variables: { data } })
    }

    if (isLoadingProfile) return <SocialLinksFormSkeleton />

    return <FormWrapper heading={translation('heading')}>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='px-5'>
                            <FormLabel>{translation('titleLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={translation('titlePlaceholder')}
                                    disabled={isLoadingCreate}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>{translation('titleDescription')}</FormDescription>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                        <FormItem className='px-5'>
                            <FormLabel>{translation('urlLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={translation('urlPlaceholder')}
                                    disabled={isLoadingCreate}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>{translation('urlDescription')}</FormDescription>
                        </FormItem>
                    )}
                />
                <Separator />
                <div className='flex justify-end p-5 pb-1'>
                    <Button disabled={!isValid || isLoadingCreate}>{translation("submitButton")}</Button>
                </div>
            </form>
        </Form>
        <SocialLinksList />
    </FormWrapper>
}


