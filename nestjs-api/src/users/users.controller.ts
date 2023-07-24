import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
//import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user-body';
import { UpdateUserDto } from './dtos/update-user-body';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
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

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  @Get('')
  findAll() {
    return this.prisma.user.findMany();
  }
  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
*/
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10); // Converter o id para um número inteiro
    return this.prisma.user.update({
      where: { id: userId }, // Usar o userId convertido na consulta do Prisma
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
