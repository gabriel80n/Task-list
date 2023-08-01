import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user-body';
import { CreateUserDto } from './dtos/create-user-body';
import { UsersService } from './users.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateProjectDto } from './dtos/create-project-body';
import { DeleteProjectDto } from './dtos/delete-project-body';
import { UpdateProjectDto } from './dtos/update-project-body';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
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
