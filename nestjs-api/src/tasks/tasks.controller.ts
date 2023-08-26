import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  findAllTasks(@Param('id') id: string) {
    return this.tasksService.findAllTasks(id);
  }

  @Put(':id')
  updateTaskStatus(@Param('id') id: string, @Body() novoStatus: string) {
    return this.tasksService.updateTaskStatus(+id, novoStatus);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.tasksService.removeTasks(+id);
  }
  @Put('description/:id')
  alterDescription(@Param('id') id: string, @Body() description: string) {
    return this.tasksService.alterDescription(+id, description);
  }
  @Put('title/:id')
  alterTitle(@Param('id') id: string, @Body() title: string) {
    return this.tasksService.alterTitle(+id, title);
  }
}
