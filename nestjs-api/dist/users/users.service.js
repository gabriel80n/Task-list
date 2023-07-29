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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt = require("bcrypt");
const date_fns_1 = require("date-fns");
let UsersService = exports.UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(body) {
        const data = {
            ...body,
            password: await bcrypt.hash(body.password, 10),
        };
        const createdUser = await this.prisma.user.create({ data });
        return {
            ...createdUser,
            password: undefined,
        };
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    update(id, updateUserDto) {
        const userId = parseInt(id, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: updateUserDto,
        });
    }
    async createProject(createProjectDto) {
        const user_data = await this.prisma.user.findUnique({
            where: { email: createProjectDto.email },
        });
        const user_id = user_data.id;
        const currentDate = new Date();
        const formattedDate = (0, date_fns_1.format)(currentDate, 'dd-MM-yyyy');
        const name = createProjectDto.name;
        const data = {
            createdIn: formattedDate,
            name: name,
            ownerId: user_id,
        };
        const createdProject = await this.prisma.project.create({ data });
        return {
            ...createdProject,
        };
    }
    async getProjects(email) {
        const user_data = await this.prisma.user.findUnique({
            where: { email: email },
        });
        const user_id = user_data.id;
        return this.prisma.project.findMany({
            where: { ownerId: user_id },
        });
    }
    async deleteProject(deleteProjectDto) {
        const user_data = await this.prisma.user.findUnique({
            where: {
                email: deleteProjectDto.email,
            },
        });
        const user_id = user_data.id;
        return this.prisma.project.delete({
            where: {
                id: deleteProjectDto.project_id,
                ownerId: user_id,
            },
        });
    }
    async alterProject(updateProject) {
        const user_data = await this.prisma.user.findUnique({
            where: {
                email: updateProject.email,
            },
        });
        const user_id = user_data.id;
        const project_data = await this.prisma.project.findUnique({
            where: {
                id: updateProject.project_id,
                ownerId: user_id,
            },
        });
        return this.prisma.project.update({
            where: {
                id: updateProject.project_id,
                ownerId: user_id,
            },
            data: {
                ...project_data,
                name: updateProject.name,
            },
        });
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map