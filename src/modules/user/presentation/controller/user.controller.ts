import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserInput } from '../../application/usecases/create-user/create-user.input';
import { CreateUserUsecase } from '../../application/usecases/create-user/create-user.usecase';
import { ListUsersUsecase } from '../../application/usecases/list-users/list-users.usecase';
import { UserPresenter } from '../presenter/user.presenter';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly listUsersUsecase: ListUsersUsecase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserInput): Promise<UserPresenter> {
    const output = await this.createUserUsecase.handle(body);
    return UserPresenter.format(output);
  }

  @Get()
  async listUsers() {
    const output = await this.listUsersUsecase.handle();
    return output;
  }
}
