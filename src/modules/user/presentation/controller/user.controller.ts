import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserInput } from '../../application/usecases/create-user/create-user.input';
import { CreateUserUsecase } from '../../application/usecases/create-user/create-user.usecase';
import { DeleteUserInput } from '../../application/usecases/delete-user/delete-user.input';
import { DeleteUserUsecase } from '../../application/usecases/delete-user/delete-user.usecase';
import { GetUserByIdUsecase } from '../../application/usecases/get-user-by-id/get-user-by-id.usecase';
import { ListUsersUsecase } from '../../application/usecases/list-users/list-users.usecase';
import {
  UpdateUserData,
  UpdateUserInput,
} from '../../application/usecases/update-user/update-user.input';
import { UpdateUserUsecase } from '../../application/usecases/update-user/update-user.usecase';
import { UserCollectionPresenter } from '../presenter/user-collection.presenter';
import { UserPresenter } from '../presenter/user.presenter';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly listUsersUsecase: ListUsersUsecase,
    private readonly deleteUserUsecase: DeleteUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {}

  @Post()
  async create(@Body() body: CreateUserInput): Promise<UserPresenter> {
    const output = await this.createUserUsecase.handle(body);
    return UserPresenter.format(output);
  }

  @Get()
  async list(): Promise<UserCollectionPresenter> {
    const output = await this.listUsersUsecase.handle();
    return UserCollectionPresenter.format(output);
  }

  @Get(':id')
  @HttpCode(201)
  async getById(@Param('id') id: string): Promise<UserPresenter> {
    const input = new DeleteUserInput({ id });
    const output = await this.getUserByIdUsecase.handle(input);
    return UserPresenter.format(output);
  }

  @Patch(':id')
  async update(
    @Param('id') param: string,
    @Body() body: UpdateUserData,
  ): Promise<UserPresenter> {
    const input = new UpdateUserInput(param, body);
    const output = await this.updateUserUsecase.handle(input);
    return UserPresenter.format(output);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const input = new DeleteUserInput({ id });
    await this.deleteUserUsecase.handle(input);
  }
}
