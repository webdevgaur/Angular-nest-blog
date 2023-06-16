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
exports.BlogController = exports.storage = exports.BLOG_ENTRIES_URL = void 0;
const common_1 = require("@nestjs/common");
const blog_service_1 = require("../service/blog.service");
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../../auth/guards/jwt-guard");
const user_is_author_guard_1 = require("../guards/user-is-author.guard");
const multer_1 = require("@nestjs/platform-express/multer");
const multer_2 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
exports.BLOG_ENTRIES_URL = 'http://localhost:3000/blog-entries';
exports.storage = {
    storage: (0, multer_2.diskStorage)({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        }
    })
};
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    create(blogEntry, req) {
        const user = req.user;
        return this.blogService.create(user, blogEntry);
    }
    index(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateAll({
            page,
            limit,
            route: exports.BLOG_ENTRIES_URL,
        });
    }
    indexByUser(page = 1, limit = 10, userId) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateByUser({
            page,
            limit,
            route: exports.BLOG_ENTRIES_URL,
        }, Number(userId));
    }
    findOne(id) {
        return this.blogService.findOne(id);
    }
    updateOne(blogEntry, id) {
        return this.blogService.updateOne(Number(id), blogEntry);
    }
    deleteOne(id) {
        return this.blogService.deleteOne(id);
    }
    uploadFile(file, req) {
        return (0, rxjs_1.of)(file);
    }
    findImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/blog-entry-images/' + imagename)));
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "indexByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('image/upload'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "findImage", null);
BlogController = __decorate([
    (0, common_1.Controller)('blog-entries'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map