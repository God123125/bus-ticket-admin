import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-top-booked-destinations',
  imports: [BaseChartDirective, TranslatePipe],
  templateUrl: './top-booked-destinations.component.html',
  styleUrl: './top-booked-destinations.component.scss',
})
export class TopBookedDestinationsComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  fontFamily: string = 'KhmerOSBattambang';
  @Input() chartData: any;

  barChartOption: ChartConfiguration<'bar'>['options'] = {
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
        ticks: {
          font: { family: this.fontFamily, size: 12 },
          color: '#64748b',
          precision: 0,
        },
        grid: {
          color: '#f1f5f9',
        },
      },
      x: {
        ticks: {
          font: { family: this.fontFamily, size: 12 },
          color: '#64748b',
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
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
          font: { family: this.fontFamily, size: 12 },
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

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'ចំនួនការកក់សរុប (Total Bookings)',
        backgroundColor: '#3b82f6',
        hoverBackgroundColor: '#2563eb',
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChartData();
      this.chart?.update();
    }
  }

  updateChartData() {
    let list: any[] = [];
    if (Array.isArray(this.chartData)) {
      list = this.chartData;
    } else if (this.chartData && Array.isArray(this.chartData.data)) {
      list = this.chartData.data;
    }

    const labels = list.map((item: any) => {
      const from = item?.schedule?.from;
      const to = item?.schedule?.to;

      const fromName = from?.name_kh || from?.nameKh || from?.name_en || from?.name || '';
      const toName = to?.name_kh || to?.nameKh || to?.name_en || to?.name || '';

      return `${fromName} ➔ ${toName}`;
    });
    const values = list.map((item: any) => item?.totalBookings ?? 0);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          ...this.barChartData.datasets[0],
          data: values,
        },
      ],
    };
  }
}
