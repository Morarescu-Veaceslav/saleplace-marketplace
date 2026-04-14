import {
  User,
  Heart,
  CreditCard,
  Package,
  MessageCircle,
  Bell,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { NotificationType } from '@/graphql/generated/output'

import type { LucideIcon } from 'lucide-react'

export type NotificationUIConfig = {
  icon: LucideIcon
  color?: string
}

export const notificationConfig: Partial<
  Record<NotificationType, NotificationUIConfig>
> = {
  [NotificationType.Followed]: {
    icon: User,
    color: 'text-blue-500',
  },

  [NotificationType.Liked]: {
    icon: Heart,
    color: 'text-pink-500',
  },

  [NotificationType.OrderPaid]: {
    icon: CreditCard,
    color: 'text-green-500',
  },

  [NotificationType.ProductSold]: {
    icon: Package,
    color: 'text-emerald-500',
  },

  [NotificationType.CommentCreated]: {
    icon: MessageCircle,
    color: 'text-indigo-500',
  },

  [NotificationType.OrderRefunded]: {
    icon: CheckCircle,
    color: 'text-green-500',
  },

  [NotificationType.OrderRefundedFailed]: {
    icon: XCircle,
    color: 'text-red-500',
  },
}
