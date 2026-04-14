
import { useTranslations } from "next-intl";
import { ChatSidebar } from "./chat-sidebar";

export function ChatLayout({ children }: { children: React.ReactNode }) {

    const t = useTranslations('profile.chat')

    return (
        <div className="flex h-full w-full">
            <div className="w-80 shrink-0 overflow-hidden">
                <ChatSidebar />
            </div>

            <div className="flex-1 flex flex-col h-full mt-20">
                {children}
            </div>
        </div>
    )
}