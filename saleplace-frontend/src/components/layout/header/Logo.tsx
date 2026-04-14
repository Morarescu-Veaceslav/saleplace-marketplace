'use client'

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
export function Logo() {

    const t = useTranslations('layout.header.logo')

    return <Link href='/'
        className="flex items-center gap-x-4 transition-opacity hover:opacity-75">
        <Image src="/images/logo2.png" alt="SalePlace" width={35} height={35} />
        <div className="hidden leading-tight lg:block">
            <h2 className="text-lg font-semibold tracking-wider text-accent-foreground">
                SalePlace
            </h2>
            <p className="text-sm text-muted-foreground">{t('platform')}</p>
        </div>
    </Link>
}