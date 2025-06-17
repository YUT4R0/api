import { Injectable } from '@nestjs/common';
import { UserOutput } from '../../application/usecases/common/output';

export type UserPresenterProps = {
  meta: {
    resource: string;
    timestamp: string;
  };
  data: {
    id: string;
    name: string;
    surname: string;
    email: string;
    isManager: 'Manager' | 'Supervisor';
  };
};

@Injectable()
export class UserPresenter {
  static format(output: UserOutput): UserPresenterProps {
    return {
      meta: {
        resource: 'user',
        timestamp: new Date().toISOString(),
      },
      data: {
        ...output,
        surname: output.surname || '',
        isManager: output.isManager ? 'Manager' : 'Supervisor',
      },
    };
  }
}
