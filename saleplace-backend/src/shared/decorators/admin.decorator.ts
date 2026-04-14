import { applyDecorators, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../guards/gql-auth.guard";
import { AdminGuard } from "../guards/gql-admin.guard";

export function AdminOnly() {
    return applyDecorators(UseGuards(GqlAuthGuard, AdminGuard))
}