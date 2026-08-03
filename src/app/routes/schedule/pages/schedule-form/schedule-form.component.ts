import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { ScheduleService } from '../../service/schedule.service';
import { StationService } from '../../../station/service/station.service';
import { CompanyService } from '../../../company/service/company.service';
import { Station } from '../../../station/model/station';
import { Company } from '../../../company/model/company';
import { Schedule } from '../../model/schedule';

@Component({
  selector: 'app-schedule-form',
  imports: [
    TranslatePipe,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    FormHelperComponent,
    MatSelectModule,
  ],
  templateUrl: './schedule-form.component.html',
  styleUrl: './schedule-form.component.scss',
})
export class ScheduleFormComponent {
  updateId: string = '';
  form = new FormGroup({
    from: new FormControl<string | null>(null, [Validators.required]),
    to: new FormControl<string | null>(null, [Validators.required]),
    departure_time: new FormControl<string | null>(null, [Validators.required]),
    arrival_time: new FormControl<string | null>(null, [Validators.required]),
    departure_station: new FormControl<string | null>(null, [Validators.required]),
    arrival_station: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
  });

  stations = signal<Station[]>([]);
  companies = signal<Company[]>([]);

  constructor(
    private scheduleService: ScheduleService,
    private stationService: StationService,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loadStations();
    this.loadCompanies();
    this.route.params.subscribe((params) => {
      this.updateId = params['id'] ?? '';
      if (this.updateId) {
        this.loadSchedule(this.updateId);
      }
    });
  }

  loadStations() {
    this.stationService.getMany().subscribe({
      next: (res) => {
        this.stations.set(res.list);
      },
    });
  }

  loadCompanies() {
    this.companyService.getMany().subscribe({
      next: (res) => {
        this.companies.set(res.list);
      },
    });
  }

  loadSchedule(id: string) {
    this.scheduleService.getById(id).subscribe({
      next: (res) => {
        const depStationId =
          typeof res.departure_station === 'object' && res.departure_station !== null
            ? (res.departure_station as Station)._id
            : (res.departure_station as string);

        const arrStationId =
          typeof res.arrival_station === 'object' && res.arrival_station !== null
            ? (res.arrival_station as Station)._id
            : (res.arrival_station as string);

        const companyId =
          typeof res.company === 'object' && res.company !== null
            ? (res.company as Company)._id
            : (res.company as string);

        this.form.patchValue({
          from: res.from,
          to: res.to,
          departure_time: res.departure_time,
          arrival_time: res.arrival_time,
          departure_station: depStationId || null,
          arrival_station: arrStationId || null,
          description: res.description || '',
        });
      },
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Schedule = {
      from: this.form.value.from || '',
      to: this.form.value.to || '',
      departure_time: this.form.value.departure_time || '',
      arrival_time: this.form.value.arrival_time || '',
      departure_station: this.form.value.departure_station || '',
      arrival_station: this.form.value.arrival_station || '',
      description: this.form.value.description || '',
    };

    if (this.updateId) {
      this.scheduleService.update(this.updateId, payload).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
    } else {
      this.scheduleService.create(payload).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
    }
  }
}
