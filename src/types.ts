export interface INoteItem {
    id: string,
    title: string,
    text: string,
    date: Date,
    onClick?: (id: string, title: string, text: string) => void,
    onDelete?: (id: string) => void,
}

export interface INotesList {
    list: INoteItem[],
    onClick: (id: string, title: string, text: string) => void,
}