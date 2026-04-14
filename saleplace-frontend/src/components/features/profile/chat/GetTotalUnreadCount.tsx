'use client'

import { useGetConversationsQuery } from "@/graphql/generated/output"

export function GetTotalUnreadCount() {

  const { data } = useGetConversationsQuery()

  const totalUnread =
    data?.getConversations.reduce(
      (acc, c) => acc + c.unreadCount,
      0
    ) ?? 0

  if (!totalUnread) return null

  return (
    <span className="text-xs bg-destructive text-white px-2 py-1 rounded-full">
     + {totalUnread}
    </span>
  )
}