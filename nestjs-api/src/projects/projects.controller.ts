import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from 'src/users/dtos/create-project-body';
import { DeleteProjectDto } from 'src/users/dtos/delete-project-body';
import { UpdateProjectDto } from 'src/users/dtos/update-project-body';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('att/projects')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }
  @Get('att/projects/:email')
  getProjects(@Param('email') email: string) {
    return this.projectsService.getProjects(email);
  }
  @Delete('att/projects')
  deleteProject(@Body() deleteProjectDto: DeleteProjectDto) {
    return this.projectsService.deleteProject(deleteProjectDto);
  }
  @Put('att/projects')
  alterProject(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.alterProject(updateProjectDto);
  }
}
