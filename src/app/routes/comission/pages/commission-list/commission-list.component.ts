import { Component } from '@angular/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-commission-list',
  imports: [SummaryCardComponent, TranslatePipe],
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.scss',
})
export class CommissionListComponent {
  constructor() {}
}
