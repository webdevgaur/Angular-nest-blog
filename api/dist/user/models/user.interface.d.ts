import { BlogEntry } from "src/blog/model/blog-entry.interface";
export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
    blogEntries?: BlogEntry[];
}
export declare enum UserRole {
    ADMIN = "admin",
    CHIEFEDITOR = "chiefeditor",
    EDITOR = "editor",
    USER = "user"
}
