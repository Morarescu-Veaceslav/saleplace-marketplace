
export function getMediaSource(src?: string | null) {

    if (!src) return undefined;

    if (src.startsWith('data:image') || src.startsWith('blob:')) {
        return src;
    }

    if (src.startsWith('http')) {
        return src;
    }

    return `https://res.cloudinary.com/dl8sgz5gl/image/upload/${src}.webp`;
}