'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/common/Tabs"
import { Heading } from "@/components/ui/elements/Heading"
import { useTranslations } from "next-intl"
import { ChangeAvatarForm } from "./profile/avatar/ChangeAvatarForm"
import { PresetAvatarSelector } from "./profile/avatar/PresetAvatarSelector"
import { ChangeInfoForm } from "./profile/info/ChangeInfoForm"
import { SocialLinksForm } from "./profile/socialLinks/SocialLinksForm"
import { ChangeEmailForm } from "./account/email/ChangeEmailForm"
import { ChangePasswordForm } from "./account/password/ChangePasswordForm"
import { WrapperTotp } from "./account/totp/WrapperTotp"
import { DeactivateCard } from "./account/deactivate/DeactivateCard"
import { SessionsList } from "./sessions/SessionsList"

export function UserSettings() {

    const t = useTranslations('dashboard.settings')

    return <div className="lg:px-10 w-full">

        <Heading
            title={t('header.heading')}
            description={t('header.description')}
            size="lg"
        />

        <Tabs defaultValue="profile" className="w-full mt-3">
            <TabsList className="flex border-b border-border flex-wrap">
                <TabsTrigger value="profile">
                    {t('header.profile')}
                </TabsTrigger>
                <TabsTrigger value="account">
                    {t('header.account')}
                </TabsTrigger>
                <TabsTrigger value="sessions">
                    {t('header.sessions')}
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-4">
                <div className="mt-3 space-y-6">
                    <Heading
                        title={t('account.header.heading')}
                        description={t('account.header.description')}
                        size="sm" />
                    <ChangeAvatarForm />
                    <PresetAvatarSelector />
                    <ChangeInfoForm />
                    <SocialLinksForm />
                </div>
            </TabsContent>

            <TabsContent value="account" className="mt-4">
                <div className="mt-3 space-y-6">
                    <Heading
                        title={t('profile.header.heading')}
                        description={t('profile.header.description')}
                        size="sm" />
                    <ChangeEmailForm />
                    <ChangePasswordForm />
                    <Heading
                        title={t('account.header.securityHeading')}
                        description={t('account.header.securityDescription')}
                        size="sm" />
                    <WrapperTotp />
                    <Heading
                        title={t('account.deactivation.heading')}
                        description={t('account.deactivation.description')}
                        size="sm" />
                    <DeactivateCard />
                </div>
            </TabsContent>

            <TabsContent value="sessions" className="mt-4">
                <div className="mt-3 space-y-6">
                    <Heading
                        title={t('sessions.header.heading')}
                        description={t('sessions.header.description')}
                        size="sm" />
                    <SessionsList />
                </div>
            </TabsContent>
        </Tabs>
    </div>
}