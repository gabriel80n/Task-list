import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-body';
import { UsersService } from './users.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

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
