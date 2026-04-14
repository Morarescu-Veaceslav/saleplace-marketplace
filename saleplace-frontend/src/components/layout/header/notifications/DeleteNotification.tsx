import { useDeleteNotificationMutation } from "@/graphql/generated/output"
import { X } from "lucide-react"


export function DeleteNotification({ notificationId }: { notificationId: string }) {

    const [deleteNotification, { loading }] = useDeleteNotificationMutation({
        variables: {
            notificationId: notificationId
        },
        update(cache) {
            cache.evict({
                id: cache.identify({
                    __typename: 'NotificationModel',
                    id: notificationId
                })
            })
        }
    })


    return (
        <button
            onClick={() => deleteNotification()}
            disabled={loading}
            aria-label="Delete notification"
            className="
        text-muted-foreground
        hover:text-destructive
        transition-colors
        p-1
        rounded-md
        cursor-pointer
      "
        >
            <X className="h-4 w-4" />
        </button>
    )
}