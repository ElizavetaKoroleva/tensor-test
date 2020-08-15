export interface INoteItem {
    id: string,
    title: string,
    text: string,
    date: Date,
    onClick?: (id: string, title: string, text: string) => void;
}

export interface INotesList {
    list: INoteItem[],
    onClick: (id: string, title: string, text: string) => void;
}