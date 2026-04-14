import type { SessionMetadata } from '@shared/session-metadata.types';

export interface DeactivateTemplateProps {
    token: string
    metadata: SessionMetadata
}

export interface SendDeactivateToken {
    email: string,
    token: string,
    metadata: SessionMetadata
}