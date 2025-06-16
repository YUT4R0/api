import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { IUserRepository } from 'src/modules/user/domain/repository/user.repository.interface';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(id: string): UserEntity {
    throw new Error('Method not implemented.');
  }

  async create(user: UserEntity): Promise<any> {
    try {
      const existingUser = this.findByEmail(user.email);
      if (existingUser !== null) throw new Error('User already exists');

      await this.prismaService.user.create({
        data: UserMapper.toModel(user),
      });
    } catch (error) {
      throw new Error(`Error occurrend when creating user: ${error}`);
    }
  }

  update(id: string, userData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return UserMapper.toDomain(user);
  }
}
