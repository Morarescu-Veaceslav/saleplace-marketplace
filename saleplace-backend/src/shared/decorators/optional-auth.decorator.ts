import { applyDecorators, UseGuards } from "@nestjs/common";
import { OptionalGqlAuthGuard } from "../guards/gql-optional-auth.guard";


export function OptionalAuth() {
    return applyDecorators(UseGuards(OptionalGqlAuthGuard))
}