export function getStatusColor(status: string) {
    switch (status) {
        case 'SUCCESS':
            return 'text-success'
        case 'PENDING':
        case 'REFUND_REQUESTED':
            return 'text-warning'
        case 'FAILED':
        case 'REFUND_FAILED':
            return 'text-destructive'
        case 'CANCELED':
            return 'text-muted-foreground'
        case 'REFUNDED':
            return 'text-blue-500'
        default:
            return 'text-muted-foreground'
    }
}