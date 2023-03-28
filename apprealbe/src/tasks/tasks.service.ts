import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTaskDTO from './dto/create-task.dto';
import TaskEntity from './task.entity';
import Task from './task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async fetchUsersTasks(userId: number): Promise<Task[]> {
    return await this.tasksRepository.find({
      relations: {
        owner: true,
      },
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async findById(id: number) {
    try {
      return await this.tasksRepository.find({ where: { id } });
    } catch (err) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }

  async createTask(user: any, task: CreateTaskDTO): Promise<Task> {
    try {
      const newTask = await this.tasksRepository.create({
        ...task,
        owner: user,
      });
      await this.tasksRepository.save(newTask);

      return newTask;
    } catch (err) {
      throw new HttpException('Task wasn\t created', HttpStatus.BAD_REQUEST);
    }
  }

  async markAsDone(id: number) {
    await this.tasksRepository.update(id, { isDone: true });
  }

  async deleteTask(id: number) {
    const deleteResponse = await this.tasksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
  }
}
