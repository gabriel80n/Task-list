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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_body_1 = require("./dtos/create-user-body");
const users_service_1 = require("./users.service");
const is_public_decorator_1 = require("../auth/decorators/is-public.decorator");
const create_project_body_1 = require("./dtos/create-project-body");
const delete_project_body_1 = require("./dtos/delete-project-body");
const update_project_body_1 = require("./dtos/update-project-body");
let UsersController = exports.UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findByEmail(email) {
        return this.userService.findByEmail(email);
    }
    findAll() {
        return this.userService.findAll();
    }
    createProject(createProjectDto) {
        return this.userService.createProject(createProjectDto);
    }
    getProjects(email) {
        return this.userService.getProjects(email);
    }
    deleteProject(deleteProjectDto) {
        return this.userService.deleteProject(deleteProjectDto);
    }
    alterProject(updateProjectDto) {
        return this.userService.alterProject(updateProjectDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, is_public_decorator_1.IsPublic)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_body_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('att/projects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_body_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)('att/projects/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Delete)('att/projects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_project_body_1.DeleteProjectDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Put)('att/projects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_project_body_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "alterProject", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map