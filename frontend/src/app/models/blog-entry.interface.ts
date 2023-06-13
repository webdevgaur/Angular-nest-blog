import { User } from "./user.interface";


export interface BlogEntry {
    id?: number;
    title?:string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: User;
    headerImage?: string;
    publishedDate?: Date;
    isPublished?: boolean;
}

export interface Meta {    
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;      
}

export interface Links {
    first: number;
    previous: number;
    next: number;
    last: number;
}

export interface BlogEntriesPageable {
    items: BlogEntry[];
    meta: Meta;
    links: Links;
}

export interface File {
    data: any;
    progress: number;
    inProgress: boolean;
}