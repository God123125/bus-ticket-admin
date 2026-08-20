import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import { TripService } from '../../service/trip.service';
import { BusService } from '../../../bus/service/bus.service';
import { ScheduleService } from '../../../schedule/service/schedule.service';
import { Bus } from '../../../bus/model/bus';
import { Schedule } from '../../../schedule/model/schedule';
import { TimePipe } from '../../../../shared/pipes/time-pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-trip-form',
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
    MatTooltipModule,
    TimePipe,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss',
})
export class TripFormComponent {
  updateId: string = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  form = new FormGroup({
    bus: new FormControl<string | null>(null, [Validators.required]),
    schedule: new FormControl<string | null>(null, [Validators.required]),
    departure_date: new FormControl<string | null>(null, [Validators.required]),
    price_per_seat: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    amenities: new FormControl<string[]>([]),
  });

  buses = signal<Bus[]>([]);
  schedules = signal<Schedule[]>([]);
  amenities: string[] = ['WiFi', 'AC', 'Water', 'USB'];
  constructor(
    private tripService: TripService,
    private busService: BusService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loadBuses();
    this.loadSchedules();
    this.route.params.subscribe((params) => {
      this.updateId = params['id'] ?? '';
      if (this.updateId) {
        this.loadTrip(this.updateId);
      }
    });
  }

  loadBuses() {
    this.busService.getMany().subscribe({
      next: (res) => {
        this.buses.set(res.list);
      },
    });
  }

  loadSchedules() {
    this.scheduleService.getMany().subscribe({
      next: (res) => {
        this.schedules.set(res.list);
      },
    });
  }

  loadTrip(id: string) {
    this.tripService.getById(id).subscribe({
      next: (res) => {
        let depDate = '';
        if (res.departure_date) {
          const dateObj = new Date(res.departure_date);
          depDate = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : '';
        }
        if (res.image) {
          this.previewUrl = res.image;
        }
        this.form.patchValue({
          bus:
            typeof res.bus === 'object' && res.bus ? res.bus._id : (res.bus as unknown as string),
          schedule:
            typeof res.schedule === 'object' && res.schedule
              ? res.schedule._id
              : (res.schedule as unknown as string),
          departure_date: depDate,
          price_per_seat: res.price_per_seat,
          amenities: res.amenities,
        });
      },
    });
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      bus: this.form.value.bus || '',
      schedule: this.form.value.schedule || '',
      departure_date: this.form.value.departure_date || '',
      price_per_seat: this.form.value.price_per_seat ?? 0,
      amenities: this.form.value.amenities,
    };

    if (this.updateId) {
      this.tripService.update(this.updateId, payload as any).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
    } else {
      this.tripService.create(payload as any).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
    }
  }
}
