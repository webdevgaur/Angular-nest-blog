import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";
import { BlogService } from "../service/blog.service";
export declare class UserIsAuthorGuard implements CanActivate {
    private userService;
    private blogService;
    constructor(userService: UserService, blogService: BlogService);
    canActivate(context: ExecutionContext): Observable<boolean>;
}
