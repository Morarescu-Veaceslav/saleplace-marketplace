import { applyDecorators, UseGuards } from "@nestjs/common";
import { BlockedGuard } from "../guards/gql-blocked.guard";
import { GqlAuthGuard } from "../guards/gql-auth.guard";

export function Blocked() {
    return applyDecorators(UseGuards(GqlAuthGuard, BlockedGuard));
}