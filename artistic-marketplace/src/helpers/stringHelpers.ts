export function truncateString(str: string, maxWords: number): string {
    const words = str.split(' ');
    if (words.length <= maxWords) {
        return str;
    } else {
        const truncatedWords = words.slice(0, maxWords);
        return truncatedWords.join(' ');// + '...';
    }
}
