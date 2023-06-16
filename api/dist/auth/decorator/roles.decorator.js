"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRoles = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const hasRoles = (...hasRoles) => (0, decorators_1.SetMetadata)('roles', hasRoles);
exports.hasRoles = hasRoles;
//# sourceMappingURL=roles.decorator.js.map