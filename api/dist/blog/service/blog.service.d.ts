import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/user/models/user.interface';
import { BlogEntry } from '../model/blog-entry.interface';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class BlogService {
    private readonly blogRepository;
    private userService;
    constructor(blogRepository: Repository<BlogEntryEntity>, userService: UserService);
    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry>;
    generateSlug(title: string): Observable<string>;
    findAll(): Observable<BlogEntry[]>;
    findByUser(userId: number): Observable<BlogEntry[]>;
    findOne(id: number): Observable<BlogEntry>;
    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>;
    deleteOne(id: number): Observable<any>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>>;
    paginateByUser(options: IPaginationOptions, userId: number): Observable<Pagination<BlogEntry>>;
}
