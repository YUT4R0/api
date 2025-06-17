import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repository/user.repository.interface';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: UUIDValueObject): Promise<UserEntity | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id.toString,
        },
      });

      if (!user) return null;
      return UserMapper.toDomain(user);
    } catch (error) {
      throw new Error(`Error occurrend when fetching user by id: ${error}`);
    }
  }

  async findAll(): Promise<UserEntity[] | []> {
    try {
      const users = await this.prismaService.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return users.map((u) => UserMapper.toDomain(u));
    } catch (error) {
      throw new Error(`Error occurrend when fetching users: ${error}`);
    }
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userModel = UserMapper.toModel(user);
    try {
      const createdUser = await this.prismaService.user.upsert({
        where: {
          id: userModel.id,
        },
        create: userModel,
        update: userModel,
      });

      return UserMapper.toDomain(createdUser);
    } catch (error) {
      throw new Error(`Error occurrend when creating user: ${error}`);
    }
  }

  async delete(user: UserEntity): Promise<void> {
    try {
      await this.prismaService.user.delete({
        where: {
          id: UserMapper.toModel(user).id,
        },
      });
    } catch (error) {
      throw new Error(`Error occurrend when deleting user: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return null;
      return UserMapper.toDomain(user);
    } catch (error) {
      throw new Error(`Error occurrend when fetching user by email: ${error}`);
    }
  }
}
