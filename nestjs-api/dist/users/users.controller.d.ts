import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dtos/update-user-body';
import { CreateUserDto } from './dtos/create-user-body';
export declare class UsersController {
    private prisma;
    userService: any;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findAll(): any;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): any;
}
