'use client'

import { useVerifyAccountMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { AuthWrapper } from "../AuthWrapper"
import { Loader } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export function VerifyAccountForm() {
    const t = useTranslations('auth.verify')

    const router = useRouter()

    const { auth } = useAuth()

    const searchParams = useSearchParams()
    
    const token = searchParams.get('token') ?? ''

    const [verify] = useVerifyAccountMutation({
        onCompleted() {
            auth()
            toast.success(t('successMessage'))
            router.push('/dashboard/settings')
        },

        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    useEffect(() => {
        verify({
            variables: {
                data: { token }
            }
        })
    }, [token])

    return (
        <AuthWrapper heading={t('heading')} description={t('description')}>
            <div className="flex justify-center">
                <Loader className="size-8  animate-spin" />
            </div>
        </AuthWrapper>
    )
}