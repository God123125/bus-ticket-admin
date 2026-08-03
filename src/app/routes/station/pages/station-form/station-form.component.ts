import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { FormHelperComponent } from '../../../../shared/form-helper/form-helper.component';
import * as L from 'leaflet';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { StationService } from '../../service/station.service';

// Fix Leaflet default marker icons for Webpack/Vite build
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-station-form',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslatePipe,
    FormHelperComponent,
    RouterModule,
  ],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private marker?: L.Marker;
  updateId: string = '';
  form = new FormGroup({
    station_name: new FormControl('', Validators.required),
    latitude: new FormControl(0, Validators.required),
    longitude: new FormControl(0, Validators.required),
  });
  constructor(
    private stationService: StationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.updateId = params['id'] ?? '';
          this.loadStation(this.updateId);
        }
      },
    });
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  loadStation(id: string) {
    this.stationService.getById(id).subscribe((res) => {
      this.form.patchValue({
        station_name: res.station_name,
        latitude: res.latitude,
        longitude: res.longitude,
      });
    });
  }
  private initMap(): void {
    if (!this.mapContainer) return;

    const initialLat = this.form.controls.latitude.value || 11.5564;
    const initialLng = this.form.controls.longitude.value || 104.9282;

    this.map = L.map(this.mapContainer.nativeElement).setView([initialLat, initialLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    if (this.form.controls.latitude.value && this.form.controls.longitude.value) {
      this.marker = L.marker([initialLat, initialLng]).addTo(this.map);
    }

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(6));
      const lng = parseFloat(e.latlng.lng.toFixed(6));

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else if (this.map) {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      this.form.patchValue({
        latitude: lat,
        longitude: lng,
      });
      this.form.controls.latitude.markAsDirty();
      this.form.controls.longitude.markAsDirty();
    });

    this.form.valueChanges.subscribe((val) => {
      const lat = val.latitude as number;
      const lng = val.longitude as number;
      if (!isNaN(lat) && !isNaN(lng) && this.map) {
        const newLatLng = L.latLng(lat, lng);
        if (this.marker) {
          this.marker.setLatLng(newLatLng);
          this.map?.setView([lat, lng], 13);
        } else {
          this.marker = L.marker(newLatLng).addTo(this.map);
          this.map?.setView([lat, lng], 13);
        }
      }
    });

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 200);
  }
  onSave() {
    if (this.form.valid) {
      const val = this.form.value;
      const payload = {
        station_name: val.station_name!,
        latitude: val.latitude!,
        longitude: val.longitude!,
      };
      this.stationService.create(payload).subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {},
      });
    }
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
