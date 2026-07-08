import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-summary-card',
  imports: [MatRippleModule, MatIconModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value?: number;
  @Input() icon: string = '';
  @Input() iconBgColor: string = '';
  @Input() iconColor: string = '';
}
