export  function parseMessageTime(updatedAt?: string | null, createdAt?: string | null) {

    const raw = updatedAt || createdAt;
    if (!raw) return null;

    let timestamp: number;

    if (typeof raw === "number") {
        timestamp = raw;
    } else if (!isNaN(Number(raw))) {
        timestamp = Number(raw);
    } else {
        const date = new Date(raw);
        if (isNaN(date.getTime())) return null;
        timestamp = date.getTime();
    }

    return new Date(timestamp);
};