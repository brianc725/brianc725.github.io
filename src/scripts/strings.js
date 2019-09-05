export const nameNoSpace = (name) => {
    return name.replace(/\s/g, '');
}

export const sortAlpha = (items) => {
    return items.sort((a,b) => {
        return a['data'].name.toLowerCase().localeCompare(b['data'].name.toLowerCase());
    });
}