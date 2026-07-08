import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { SummaryCardComponent } from '../../components/summary-card/summary-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [MatRippleModule, SummaryCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
