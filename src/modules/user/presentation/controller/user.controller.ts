import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUsecase } from '../../application/usecases/create-user/create-user.usecase';
import { CreateUserInput } from '../../application/usecases/create-user/input';
import { UserPresenter } from '../presenter/user.presenter';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly presenter: UserPresenter,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserInput) {
    const output = await this.createUserUsecase.handle(body);
    return this.presenter.format(output);
  }
}
