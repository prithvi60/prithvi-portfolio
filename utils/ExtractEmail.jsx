export function extractEmail(text) {
    // Regular expression to match email addresses
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    // Find all matches in the text
    const matches = text.match(emailRegex);

    // return matches ? matches[0] : null;
    if (!matches) return null;
    return matches.length === 1 ? matches[0] : matches;
}

// const email = extractEmail(content);

// console.log(email);