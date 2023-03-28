import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-auth.guard';
import RequestWithUser from 'src/auth/request-with-user.interface';
import CreateTaskDTO from './dto/create-task.dto';
import TaskDTO from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('todo')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@UseGuards(JwtAuthenticationGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TaskDTO, isArray: true })
  async getAllUserTasks(@Req() request: RequestWithUser) {
    const user = request.user;
    return user ? await this.tasksService.fetchUsersTasks(user.id) : [];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TaskDTO })
  @ApiNotFoundResponse()
  getTaskById(@Param('id') id: string) {
    return this.tasksService.findById(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TaskDTO })
  @ApiBadRequestResponse()
  async createTask(
    @Req() request: RequestWithUser,
    @Body() task: CreateTaskDTO,
  ) {
    return this.tasksService.createTask(request.user, task);
  }

  @Put('/done/:id')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async markAsDone(@Param('id') id: string) {
    return this.tasksService.markAsDone(Number(id));
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
