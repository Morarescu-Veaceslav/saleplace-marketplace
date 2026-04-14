import type { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../common/Tooltip";

interface HintProps {
    label: string;
    asChild?: boolean;
    side?: 'top' | 'bottom' | 'right';
    align?: 'start' | 'center' | 'end';
}

export function Hint({
    label,
    asChild,
    side,
    align,
    children
}: PropsWithChildren<HintProps>) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-sm">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
