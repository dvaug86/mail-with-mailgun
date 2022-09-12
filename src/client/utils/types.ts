export interface IBlog {
    id: number;
    title: string ;
    content: string;
    authorid: number;
    created_at: Date;
    name: string;
}

export interface ITag {
    id: number;
    name: string;
    created_at?: Date;
}