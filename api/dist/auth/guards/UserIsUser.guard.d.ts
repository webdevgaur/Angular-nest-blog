import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs/internal/Observable";
import { UserService } from "src/user/service/user.service";
export declare class UserIsUserGuard implements CanActivate {
    private userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
