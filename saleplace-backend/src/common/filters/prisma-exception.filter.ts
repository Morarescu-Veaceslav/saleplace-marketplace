import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Prisma } from "@prisma/generated";
import { GraphQLError } from 'graphql';
import { ErrorCode } from '../errors/error-codes';


@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        switch (error.code) {
            // 🔑 UNIQUE constraint
            case 'P2002': {
                const target = error.meta?.target as string[] | undefined;

                if (target?.includes('username')) {
                    throw new GraphQLError('Username already exists', {
                        extensions: { code: ErrorCode.USERNAME_TAKEN },
                    });
                }

                if (target?.includes('email')) {
                    throw new GraphQLError('Email already in use', {
                        extensions: { code: ErrorCode.EMAIL_ALREADY_IN_USE },
                    });
                }

                if (target?.includes('slug')) {
                    throw new GraphQLError('Resource already exists', {
                        extensions: { code: ErrorCode.SLUG_TAKEN },
                    });
                }

                throw new GraphQLError('Unique constraint violated', {
                    extensions: { code: ErrorCode.CONFLICT },
                });
            }

            case 'P2025':
                throw new GraphQLError('Resource not found', {
                    extensions: { code: ErrorCode.NOT_FOUND },
                });

            default:
                throw new GraphQLError('Internal server error', {
                    extensions: { code: ErrorCode.INTERNAL_ERROR },
                });
        }
    }
}
