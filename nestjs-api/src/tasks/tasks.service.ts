import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const project_id = parseInt(createTaskDto.projectId, 10);
    const data = {
      title: createTaskDto.title,
      description: createTaskDto.description,
      prioridade: createTaskDto.priority,
      status: createTaskDto.status,
      projectId: project_id,
    };
    const createdTask = await this.prisma.task.create({ data });
    return createdTask;
  }

  findAllTasks(id: string) {
    try {
      const project_id = parseInt(id, 10);
      return this.prisma.task.findMany({
        where: { projectId: project_id },
      });
    } catch (error) {
      console.error(error); // Imprimir o erro no console para depuração
      throw error; // Relançar o erro para que ele seja tratado em um nível superior
    }
  }

  async updateTaskStatus(id: number, novoStatus: any) {
    console.log(novoStatus);
    try {
      const task = await this.prisma.task.findUnique({
        where: { id: id },
      });
      return await this.prisma.task.update({
        where: { id: id },
        data: {
          ...task,
          status: novoStatus.status,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
      throw new InternalServerErrorException(
        'Erro ao atualizar o status da tarefa',
      );
      // Ou você pode personalizar a mensagem de erro, se necessário
      // throw new InternalServerErrorException('Erro ao atualizar o status da tarefa: ' + error.message);
    }
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
