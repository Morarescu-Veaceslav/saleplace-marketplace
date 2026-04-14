'use clinet'

import { useTranslations } from "next-intl"
import { PropsWithChildren } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../common/AlertDialog"

interface ConfirmModalProps {
    heading: string
    message: string
    onConfirm: () => void
    open: boolean
    onOpenChange: (open: boolean) => void
}


export function ConfirmModal({
    heading,
    message,
    onConfirm,
    open,
    onOpenChange,
}: PropsWithChildren<ConfirmModalProps>) {

    const t = useTranslations('components.confirmModal')

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{heading}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {t('cancel')}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        {t('continue')}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

