import { Injectable, Injector, Service } from '@angular/core';
import { BaseCrudService } from '../../../services/base-crud.service';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseCrudService<Trip> {
  constructor(private injector: Injector) {
    super(injector);
    this.path = '/api/trips';
  }
}
