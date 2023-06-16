"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blog_entry_entity_1 = require("./model/blog-entry.entity");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const blog_controller_1 = require("./controller/blog.controller");
const blog_service_1 = require("./service/blog.service");
let BlogModule = class BlogModule {
};
BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([blog_entry_entity_1.BlogEntryEntity]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService],
    })
], BlogModule);
exports.BlogModule = BlogModule;
//# sourceMappingURL=blog.module.js.map