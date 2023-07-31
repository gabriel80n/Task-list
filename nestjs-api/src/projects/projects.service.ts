import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProjectDto } from 'src/users/dtos/create-project-body';
import { DeleteProjectDto } from 'src/users/dtos/delete-project-body';
import { UpdateProjectDto } from 'src/users/dtos/update-project-body';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const user_data = await this.prisma.user.findUnique({
      where: { email: createProjectDto.email },
    });
    const user_id = user_data.id;
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy');
    const name = createProjectDto.name;
    const data = {
      createdIn: formattedDate,
      name: name,
      ownerId: user_id,
    };
    const createdProject = await this.prisma.project.create({ data });
    return {
      ...createdProject,
    };
  }
  async getProjects(email: string) {
    const user_data = await this.prisma.user.findUnique({
      where: { email: email },
    });
    const user_id = user_data.id;
    return this.prisma.project.findMany({
      where: { ownerId: user_id },
    });
  }
  async deleteProject(deleteProjectDto: DeleteProjectDto) {
    const user_data = await this.prisma.user.findUnique({
      where: {
        email: deleteProjectDto.email,
      },
    });
    const user_id = user_data.id;

    return this.prisma.project.delete({
      where: {
        id: deleteProjectDto.project_id,
        ownerId: user_id,
      },
    });
  }
  async alterProject(updateProject: UpdateProjectDto) {
    const user_data = await this.prisma.user.findUnique({
      where: {
        email: updateProject.email,
      },
    });
    const user_id = user_data.id;
    const project_data = await this.prisma.project.findUnique({
      where: {
        id: updateProject.project_id,
        ownerId: user_id,
      },
    });
    return this.prisma.project.update({
      where: {
        id: updateProject.project_id,
        ownerId: user_id,
      }, // Usar o userId convertido na consulta do Prisma
      data: {
        ...project_data,
        name: updateProject.name,
      },
    });
  }
}
