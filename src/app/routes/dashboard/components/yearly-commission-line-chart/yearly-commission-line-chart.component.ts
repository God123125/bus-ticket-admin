import { Component, EventEmitter, input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { YearlyCommission } from '../../models/yearly-commission';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-yearly-commission-line-chart',
  imports: [BaseChartDirective, TranslatePipe, MatFormFieldModule, MatSelectModule],
  templateUrl: './yearly-commission-line-chart.component.html',
  styleUrl: './yearly-commission-line-chart.component.scss',
})
export class YearlyCommissionLineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Output() yearChange = new EventEmitter<number>();
  fontFamily: string = 'KhReg';
  chartData = input<YearlyCommission>();
  years: number[] = [];
  lineChartOption: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 15,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
        ticks: {
          font: { family: this.fontFamily, size: 12 },
          color: '#64748b',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: this.fontFamily, size: 12 },
          color: '#64748b',
        },
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          font: { family: this.fontFamily, size: 14 },
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        position: 'nearest',
        backgroundColor: '#334155',
        titleColor: '#f8fafc',
        bodyColor: '#f8fafc',
        titleFont: { family: this.fontFamily, size: 14, weight: 'bold' },
        bodyFont: { family: this.fontFamily, size: 14 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
        bodySpacing: 10,
      },
    },
  };
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'ចំនួនសំបុត្របានលក់',
        backgroundColor: '#5822c53a',
        borderColor: '#5620c3ff',
        pointBackgroundColor: '#340a8aff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      },
    ],
  };
  constructor() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChart();
    }
  }
  updateChart() {
    const list = this.chartData()!.data;
    this.lineChartData = {
      labels: list.map((el) => el.label),
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: list.map((el) => el.income),
        },
      ],
    };
    this.chart?.chart?.update();
  }
  onYearChange(event: MatSelectChange) {
    this.yearChange.emit(event.value);
  }
}
