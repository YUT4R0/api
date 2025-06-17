import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repository/user.repository.interface';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UUIDValueObject } from 'src/shared/domain/value-object/uuid.vo';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: UUIDValueObject): Promise<UserEntity> {
    throw new Error('Method not implemented.');
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

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      const existingUser = await this.findByEmail(user.email);
      if (existingUser !== null) throw new Error('User already exists');

      const createdUser = await this.prismaService.user.create({
        data: UserMapper.toModel(user),
      });

      return UserMapper.toDomain(createdUser);
    } catch (error) {
      throw new Error(`Error occurrend when creating user: ${error}`);
    }
  }

  update(id: UUIDValueObject, userData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: UUIDValueObject): Promise<void> {
    throw new Error('Method not implemented.');
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
