export async function fetchJson<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const err = await res.json().catch(() => null)
        throw {
            code: err?.code ?? 'UNKNOWN',
            message: err?.message ?? 'Request failed',
            status: res.status,
        }
    }
    return res.json()
}