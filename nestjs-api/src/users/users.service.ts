import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dtos/create-user-body';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user-body';
import { CreateProjectDto } from './dtos/create-project-body';
import { format } from 'date-fns';
import { DeleteProjectDto } from './dtos/delete-project-body';
import { UpdateProjectDto } from './dtos/update-project-body';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateUserDto) {
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
  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    const userId = parseInt(id, 10); // Converter o id para um número inteiro
    return this.prisma.user.update({
      where: { id: userId }, // Usar o userId convertido na consulta do Prisma
      data: updateUserDto,
    });
  }

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
  /*
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }
  
  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateUserDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.userModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
  */
}
