import type { SessionMetadata } from "@shared/session-metadata.types"

export interface PasswordRecoveryTemplateProps {
    domain: string
    token: string
    metadata: SessionMetadata
}

export interface SendPasswordResetToken {
    email: string,
    token: string,
    metadata: SessionMetadata
}