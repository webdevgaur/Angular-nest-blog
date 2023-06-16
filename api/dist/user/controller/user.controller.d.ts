import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { User } from '../models/user.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare const storage: {
    storage: any;
};
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: User): Observable<User | Object>;
    login(user: User): Observable<Object>;
    findOne(params: any): Observable<User>;
    index(page: number, limit: number, username: string): Observable<Pagination<User>>;
    deleteOne(id: string): Observable<any>;
    updateOne(id: string, user: User): Observable<any>;
    updateRoleOfUser(id: string, user: User): Observable<User>;
    uploadFile(file: any, req: any): Observable<Object>;
    findProfileImage(imagename: any, res: any): Observable<Object>;
}
