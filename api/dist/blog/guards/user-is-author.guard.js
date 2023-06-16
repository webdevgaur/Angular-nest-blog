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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsAuthorGuard = void 0;
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/service/user.service");
const blog_service_1 = require("../service/blog.service");
let UserIsAuthorGuard = class UserIsAuthorGuard {
    constructor(userService, blogService) {
        this.userService = userService;
        this.blogService = blogService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const blogEntryId = Number(params.id);
        const user = request.user;
        return this.userService.findOne(user.id).pipe((0, rxjs_1.switchMap)((user) => this.blogService.findOne(blogEntryId).pipe((0, rxjs_1.map)((blogEntry) => {
            let hasPermission = false;
            if (user.id === blogEntry.author.id) {
                hasPermission = true;
            }
            return user && hasPermission;
        }))));
    }
};
UserIsAuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        blog_service_1.BlogService])
], UserIsAuthorGuard);
exports.UserIsAuthorGuard = UserIsAuthorGuard;
//# sourceMappingURL=user-is-author.guard.js.map