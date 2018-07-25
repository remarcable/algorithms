export default function match(text, pattern) {
    const n = text.length - 1;
    const m = pattern.length - 1;
    const result = [];

    if (pattern.length === 0) {
        return null;
    }

    for (let i = 0; i <= n - m; i++) {
        for (let j = 0; j <= m; j++) {
            const textMatches = text[i + j] === pattern[j];
            const lastCharacterOfPattern = j === m;
            if (textMatches) {
                if (lastCharacterOfPattern) {
                    result.push(i);
                }
            } else {
                break;
            }
        }
    }

    return result;
}


// text: jonas jodelte jeute
// pattern: jo
// output 0, 6
