'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/common/Dialog";
import type { FindSessionsByUserQuery } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import { formatDate } from "@/utils/format-date";
import dynamic from 'next/dynamic'

type SessionType = NonNullable<
    FindSessionsByUserQuery['findSessionsByUser']
>[number];

interface SessionItemProps {
    session: SessionType
}

export function SessionModal({ children, session }: PropsWithChildren<SessionItemProps>) {

    const translation = useTranslations('dashboard.settings.sessions.sessionModal')

    const SessionMap = dynamic(
        () => import('./SessionMap').then(m => m.SessionMap),
        { ssr: false }
    )
    const center: [number, number] = [
        session.metadata.location.latitude,
        session.metadata.location.longitude
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle className='text-xl'>{translation('heading')}</DialogTitle>
                <div className='space-y-3'>
                    <div className='flex items-center'>
                        <span className='font-medium'>{translation('device')}</span>
                        <span className='ml-2 text-muted-foreground'>{session?.metadata.device.browser},{' '}{session?.metadata.device.os}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-medium'>{translation('location')}</span>
                        <span className='ml-2 text-muted-foreground'>{session?.metadata.location.country},{' '}{session?.metadata.location.city}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-medium'>{translation('ipAddress')}</span>
                        <span className='ml-2 text-muted-foreground'>{session?.metadata.ip}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='font-medium'>{translation('createdAt')}</span>
                        <span className='ml-2 text-muted-foreground'>
                            {formatDate(session?.createdAt, true)}
                        </span>
                    </div>
                    <SessionMap center={center} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

