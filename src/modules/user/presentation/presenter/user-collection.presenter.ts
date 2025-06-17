import { Injectable } from '@nestjs/common';
import { UserOutput } from '../../application/usecases/common/output';

export type UserCollectionPresenterFormat = {
  meta: {
    resource: string;
    timestamp: string;
    count: number;
  };
  data: {
    id: string;
    name: string;
    surname: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    isManager: 'Manager' | 'Supervisor';
  }[];
};

@Injectable()
export class UserCollectionPresenter {
  static format(output: UserOutput[]): UserCollectionPresenterFormat {
    return {
      meta: {
        resource: 'user',
        timestamp: new Date().toISOString(),
        count: output.length,
      },
      data: output.map((u) => ({
        id: u.id,
        name: u.name,
        surname: u.surname ?? '',
        email: u.email,
        isManager: u.isManager ? 'Manager' : 'Supervisor',
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      })),
    };
  }
}
