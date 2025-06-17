import { Injectable } from '@nestjs/common';
import { UserOutput } from '../../application/usecases/common/output';

export type UserPresenterFormat = {
  meta: {
    resource: string;
    timestamp: string;
  };
  data: {
    id: string;
    name: string;
    surname: string;
    email: string;
    updatedAt: Date;
    isManager: 'Manager' | 'Supervisor';
  };
};

@Injectable()
export class UserPresenter {
  static format(output: UserOutput): UserPresenterFormat {
    return {
      meta: {
        resource: 'user',
        timestamp: new Date().toISOString(),
      },
      data: {
        id: output.id,
        name: output.name,
        surname: output.surname || '',
        email: output.email,
        isManager: output.isManager ? 'Manager' : 'Supervisor',
        updatedAt: output.updatedAt,
      },
    };
  }
}
