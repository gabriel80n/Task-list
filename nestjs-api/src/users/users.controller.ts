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
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.userService.delete(id);';
  }
  @Post('projects')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.userService.createProject(createProjectDto);
  }
  @Get('projects/:email')
  getProjects(@Param('email') email: string) {
    return this.userService.getProjects(email);
  }
  @Delete('projects')
  deleteProject(@Body() deleteProjectDto: DeleteProjectDto) {
    return this.userService.deleteProject(deleteProjectDto);
  }
  @Put('projects')
  alterProject(@Body() updateProjectDto: UpdateProjectDto) {
    return this.userService.alterProject(updateProjectDto);
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
