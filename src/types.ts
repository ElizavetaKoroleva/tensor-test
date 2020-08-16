export interface IButton {
    icon?: string;
    label: string;
    text?: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: (e?: React.MouseEvent) => void;
};

export interface INoteItem {
    id: string;
    title: string;
    text: string;
    date: Date;
    active: boolean;
    onClick?: (id: string, title: string, text: string, date: Date) => void;
    onDelete?: (id: string, e?: React.MouseEvent) => void;
};

export interface INotesList {
    list: INoteItem[];
    activeNote: string;
    onClick: (id: string, title: string, text: string, date: Date) => void;
    onDelete: (id: string) => void;
};

export interface IModal {
    isHidden: boolean;
    text?: string;
    confirm?: (agreement: boolean) => void;
    closeModal: (isHidden: boolean) => void;
};

export interface INote {
    id: string,
    title: string,
    text: string,
    isEditable: boolean,
    onDelete: (e?: React.MouseEvent) => void;
    onEdit: () => void;
    onCancel: () => void;
    onSave: (id: string, title: string, text: string) => void;
};

export interface IItem {
    text: string;
    value: string;
};

export interface IPopupList {
    list: IItem[];
    changeSortingOption: (value: string) => void;
};

export interface ISorting {
    options: IItem[];
    activeOption: string;
    changeSortingOption: (value: string) => void;
};

export interface IForm {
    placeholder: string;
    handleInput: (e: React.FormEvent) => void;
};