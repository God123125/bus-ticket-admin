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
import { Station } from '../../../station/model/station';
import { Company } from '../../../company/model/company';
import { GeographicService } from '../../../geographic/service/geographic.service';
import { Geographic } from '../../../geographic/model/geographic';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatExpansionModule,
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
    image: new FormControl(null),
  });

  stations = signal<Station[]>([]);
  companies = signal<Company[]>([]);
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  geographics = signal<Geographic[]>([]);
  constructor(
    private scheduleService: ScheduleService,
    private stationService: StationService,
    private router: Router,
    private route: ActivatedRoute,
    private geographicService: GeographicService,
  ) {
    this.loadStations();
    this.route.params.subscribe((params) => {
      this.updateId = params['id'] ?? '';
      if (this.updateId) {
        this.loadSchedule(this.updateId);
      }
    });
    this.loadGeographics();
  }

  loadGeographics() {
    this.geographicService.getMany().subscribe({
      next: (res) => {
        this.geographics.set(res.list);
      },
    });
  }

  loadStations() {
    this.stationService.getMany().subscribe({
      next: (res) => {
        this.stations.set(res.list);
      },
    });
  }

  loadSchedule(id: string) {
    this.scheduleService.getById(id).subscribe({
      next: (res) => {
        this.form.patchValue({
          from: res.from?._id,
          to: res.to?._id,
          departure_time: res.departure_time,
          arrival_time: res.arrival_time,
          departure_station: res.departure_station._id,
          arrival_station: res.arrival_station._id,
          description: res.description,
        });

        if (res.image) {
          this.previewUrl = res.image;
        }
      },
    });
  }
  removeImage(inputEl?: HTMLInputElement) {
    this.selectedFile = null;
    this.previewUrl = null;
    this.form.controls.image.setValue(null);
    if (inputEl) {
      inputEl.value = '';
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
    }
  }
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: any = {
      from: this.form.value.from || '',
      to: this.form.value.to || '',
      departure_time: this.form.value.departure_time || '',
      arrival_time: this.form.value.arrival_time || '',
      departure_station: this.form.value.departure_station || '',
      arrival_station: this.form.value.arrival_station || '',
      description: this.form.value.description || '',
    };
    if (this.selectedFile || this.form.value.image) {
      payload.image = this.selectedFile || this.form.value.image || '';
    }
    if (this.updateId) {
      this.scheduleService.update(this.updateId, payload as any).subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
      });
    } else {
      this.scheduleService.create(payload as any).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      });
    }
  }
}
