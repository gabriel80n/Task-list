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

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const user = {
      ...CreateUserDto,
    };
    /*
    const { name, email, password } = body;
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
    */
    return user;
  }
  @Get('post')
  findAll() {
    return this.prisma.user.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

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
