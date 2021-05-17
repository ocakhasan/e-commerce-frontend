export function sortPriceDescending(data) {
    return data.sort((a, b) => (a.unitPrice > b.unitPrice) ? 1 : -1)
}

export function sortPriceAscending(data) {
    return data.sort((a, b) => (a.unitPrice < b.unitPrice) ? 1 : -1)
}