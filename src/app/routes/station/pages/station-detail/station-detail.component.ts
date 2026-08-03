import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { StationService } from '../../service/station.service';
import { Station } from '../../model/station';
import * as L from 'leaflet';

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
  selector: 'app-station-detail',
  imports: [MatButtonModule, MatIconModule, TranslatePipe, RouterModule],
  templateUrl: './station-detail.component.html',
  styleUrl: './station-detail.component.scss',
})
export class StationDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  station = signal<Station>({} as any);
  private map?: L.Map;
  private marker?: L.Marker;

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService,
  ) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadStation(id);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  loadStation(id: string) {
    this.stationService.getById(id).subscribe({
      next: (res) => {
        this.station.set(res);
        this.updateMapPosition(res.latitude, res.longitude);
      },
    });
  }

  initMap(): void {
    if (!this.mapContainer || this.map) return;

    const initialLat = this.station().latitude || 11.5564;
    const initialLng = this.station().longitude || 104.9282;

    this.map = L.map(this.mapContainer.nativeElement).setView([initialLat, initialLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    if (this.station().latitude && this.station().longitude) {
      this.updateMapPosition(this.station().latitude, this.station().longitude);
    }

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 200);
  }

  private updateMapPosition(lat: number, lng: number): void {
    if (!this.map || !lat || !lng) return;

    const latLng = L.latLng(lat, lng);
    this.map.setView(latLng, 13);

    if (this.marker) {
      this.marker.setLatLng(latLng);
    } else {
      this.marker = L.marker(latLng).addTo(this.map);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}

