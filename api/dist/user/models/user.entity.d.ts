import { UserRole } from "./user.interface";
import { BlogEntryEntity } from "src/blog/model/blog-entry.entity";
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profileImage: string;
    blogEntries: BlogEntryEntity[];
    emailToLowercase(): void;
}
