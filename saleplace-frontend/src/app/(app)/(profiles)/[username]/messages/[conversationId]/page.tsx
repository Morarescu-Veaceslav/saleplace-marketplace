
import { ChatWindow } from "@/components/features/profile/chat/ChatWindow"

export default function ConversationPage() {

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col w-full max-w-4xl h-full">
        <ChatWindow />
      </div>
    </div>
  )
}