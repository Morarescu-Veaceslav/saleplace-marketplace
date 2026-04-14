'use client'

import { Button } from "@/components/ui/common/Button";
import { useFollowToggle } from "./useFollowToggle";
import { UserCheck, UserPlus } from "lucide-react";
import { cn } from "@/utils/tw-merge";
import { useTranslations } from "next-intl";
import { useCurrent } from "../useCurrent";
import { useAuth } from "../useAuth";

type Props = {
    userId: string;
    isFollowing: boolean;
    isCollapsed?: boolean;
    className?: string;
    variant?: "default" | "sidebar";
    size?: "xs" | "sm"
};

export function FollowButton({ userId, isFollowing, isCollapsed, className, variant, size }: Props) {
    const t = useTranslations('layout.header.sidebar.profileNav')
    const { handleToggle } = useFollowToggle(userId, isFollowing);
    const { user } = useCurrent()
    const { isAuthenticated } = useAuth()
    const isMe = user?.id === userId
    return (
        <>
            {!isMe && isAuthenticated &&
                <Button
                    size={size}
                    variant={isFollowing ? "outline" : "default"}
                    className={cn(className)}
                    onClick={handleToggle}
                >
                    {isCollapsed ? (
                        isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />
                    ) : (
                        isFollowing ? t('buttonUnfollow') : t('buttonFollow')
                    )}
                </Button>
            }
        </>
    );
}