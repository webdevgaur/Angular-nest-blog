import { UserEntity } from "src/user/models/user.entity";
export declare class BlogEntryEntity {
    id: number;
    title: string;
    slug: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    updateTimestamp(): void;
    likes: number;
    headerImage: string;
    publishedDate: Date;
    isPublished: boolean;
    author: UserEntity;
}
