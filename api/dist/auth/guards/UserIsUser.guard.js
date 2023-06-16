"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsUserGuard = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const user_service_1 = require("../../user/service/user.service");
let UserIsUserGuard = class UserIsUserGuard {
    constructor(userService) {
        this.userService = userService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const user = request.user;
        return this.userService.findOne(user.id).pipe((0, operators_1.map)((user) => {
            let hasPermission = false;
            if (user.id === Number(params.id)) {
                hasPermission = true;
            }
            return user && hasPermission;
        }));
    }
};
UserIsUserGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserIsUserGuard);
exports.UserIsUserGuard = UserIsUserGuard;
//# sourceMappingURL=UserIsUser.guard.js.map