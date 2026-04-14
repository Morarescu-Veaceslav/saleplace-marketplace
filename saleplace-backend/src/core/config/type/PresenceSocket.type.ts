export type PresenceSocket = WebSocket & {
    userId?: string,
    presenceConnected?: boolean;
}