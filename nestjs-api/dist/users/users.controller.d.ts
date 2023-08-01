import { CreateUserDto } from './dtos/create-user-body';
import { UsersService } from './users.service';
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
}
