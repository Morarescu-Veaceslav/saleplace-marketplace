export function formatCurrency(
    value: number,
    locale: string,
    currency: 'EUR' | 'USD' | 'GBP' = 'EUR'
) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(value)
}