import { ChatLayout } from "@/components/features/profile/chat/chat-layout";
import { MessagesSquare } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('profile.chat')
    return {
        title: t('heading'),
        description: t('description')
    }
}

export default async function MessagesPage() {

    const t = await getTranslations('profile.chat')

    return (
        <ChatLayout>
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center text-center max-w-sm gap-3">

                    <div className="p-4 rounded-full bg-muted">
                        <MessagesSquare className="size-10 text-muted-foreground" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        {t('heading')}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {t('description')}
                    </p>

                </div>
            </div>
        </ChatLayout>
    )
}