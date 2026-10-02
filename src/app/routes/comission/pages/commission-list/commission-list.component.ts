import { Component } from '@angular/core';
import { SummaryCardComponent } from '../../../dashboard/components/summary-card/summary-card.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommissionService } from '../../service/commission.service';

@Component({
  selector: 'app-commission-list',
  imports: [SummaryCardComponent, TranslatePipe, MatIconModule, MatButtonModule],
  templateUrl: './commission-list.component.html',
  styleUrl: './commission-list.component.scss',
})
export class CommissionListComponent {
  constructor(private commissionService: CommissionService) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.commissionService.getMany().subscribe({
      next: (res) => {},
    });
  }
}
