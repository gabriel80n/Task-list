import { CreateUserDto } from './dtos/create-user-body';
import { UsersService } from './users.service';
import { CreateProjectDto } from './dtos/create-project-body';
import { DeleteProjectDto } from './dtos/delete-project-body';
import { UpdateProjectDto } from './dtos/update-project-body';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
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
    createProject(createProjectDto: CreateProjectDto): any;
    getProjects(email: string): any;
    deleteProject(deleteProjectDto: DeleteProjectDto): any;
    alterProject(updateProjectDto: UpdateProjectDto): any;
}
