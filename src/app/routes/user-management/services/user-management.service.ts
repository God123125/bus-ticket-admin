import { Injectable, Injector } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserManagementService extends BaseCrudService<User> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/api/users';
  }
  createUser(data: { [key: string]: any }) {
    return this.requestService.postFile(this.path, {
      data,
      is_loading: true,
      is_alert_error: true,
    });
  }
}
