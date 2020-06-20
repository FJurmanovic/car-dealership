export function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

export function firstUpper(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}