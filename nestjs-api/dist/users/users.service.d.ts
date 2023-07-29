import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user-body';
import { UpdateUserDto } from './dtos/update-user-body';
import { CreateProjectDto } from './dtos/create-project-body';
import { DeleteProjectDto } from './dtos/delete-project-body';
import { UpdateProjectDto } from './dtos/update-project-body';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(body: CreateUserDto): Promise<{
        password: any;
        id: number;
        email: string;
        name: string;
    }>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {})[]>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createProject(createProjectDto: CreateProjectDto): Promise<{
        id: number;
        name: string;
        ownerId: number;
        createdIn: string;
    }>;
    getProjects(email: string): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        ownerId: number;
        name: string;
        createdIn: string;
    }, unknown> & {})[]>;
    deleteProject(deleteProjectDto: DeleteProjectDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        ownerId: number;
        name: string;
        createdIn: string;
    }, unknown> & {}>;
    alterProject(updateProject: UpdateProjectDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        ownerId: number;
        name: string;
        createdIn: string;
    }, unknown> & {}>;
}
