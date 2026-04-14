
import { ThemeToggle } from "@/components/features/appearance/theme/ChangeTheme";
import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { ChangeLanguage } from "@/components/features/appearance/language/ChangeLanguage";
import Link from "next/link";


export function Header() {
    return <header
        className="flex h-full items-center gap-x-4 transparent
        border border-border  bg-card p-4"
    >
        <Logo />
        {/* <Search /> */}
        <Link href="/posts">Posts</Link>
        <div className="ml-auto flex items-center gap-x-4">
            <ThemeToggle />
            <ChangeLanguage />
            <HeaderMenu />
        </div>
    </header>
}