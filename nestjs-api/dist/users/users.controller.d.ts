import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user-body';
import { UpdateUserDto } from './dtos/update-user-body';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    create(body: CreateUserDto): Promise<{}>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {})[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {}, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {}>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        email: string;
        name: string;
        password: string;
    }, unknown> & {}, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
