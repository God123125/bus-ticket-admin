import {
  Component,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trend-analytical-chart',
  imports: [BaseChartDirective, TranslatePipe],
  templateUrl: './trend-analytical-chart.component.html',
  styleUrl: './trend-analytical-chart.component.scss',
})
export class TrendAnalyticalChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  fontFamily: string = 'KhReg';
  // chartData = input<any>();  new style prer som rap jomnus @Input doy ke hav tha signal input
  chartData = input<any>();
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
        label: 'ចំណូលសរុប',
        backgroundColor: '#22c55e3a',
        borderColor: '#22c55e',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      },
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
      {
        data: [],
        label: 'ចំនួនការកក់សរុប',
        backgroundColor: '#c587223a',
        borderColor: '#c34b20ff',
        pointBackgroundColor: '#8a4e0aff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {
    if (this.chartData && this.chartData().data && Array.isArray(this.chartData().data)) {
      this.updateChartData();
    } else {
      this.setMockChartData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      if (this.chartData && this.chartData().data && Array.isArray(this.chartData().data)) {
        this.updateChartData();
      } else {
        this.setMockChartData();
      }
      this.chart?.update();
    }
  }
  updateChartData() {
    const list = this.chartData().data;
    this.lineChartData = {
      labels: list.map((el: any) => el.label),
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: list.map((el: any) => {
            return {
              total_revenue: el.total_revenue,
            };
          }),
        },
        {
          ...this.lineChartData.datasets[1],
          data: list.map((el: any) => {
            return {
              total_seats_sold: el.total_seats_sold,
            };
          }),
        },
        {
          ...this.lineChartData.datasets[2],
          data: list.map((el: any) => {
            return {
              total_bookings: el.total_bookings,
            };
          }),
        },
      ],
    };
  }
  setMockChartData() {
    const mockList = [
      { label: 'ច័ន្ទ', total_revenue: 1250, total_seats_sold: 1000, total_bookings: 42 },
      { label: 'អង្គារ', total_revenue: 980, total_seats_sold: 180, total_bookings: 35 },
      { label: 'ពុធ', total_revenue: 1420, total_seats_sold: 180, total_bookings: 50 },
      { label: 'ព្រហស្បតិ៍', total_revenue: 1100, total_seats_sold: 180, total_bookings: 38 },
      { label: 'សុក្រ', total_revenue: 2150, total_seats_sold: 140, total_bookings: 75 },
      { label: 'សៅរ៍', total_revenue: 2800, total_seats_sold: 180, total_bookings: 95 },
      { label: 'អាទិត្យ', total_revenue: 2450, total_seats_sold: 160, total_bookings: 88 },
    ];
    this.lineChartData = {
      labels: mockList.map((el) => el.label),
      datasets: [
        {
          ...this.lineChartData.datasets[0],
          data: mockList.map((el) => el.total_revenue),
        },
        {
          ...this.lineChartData.datasets[1],
          data: mockList.map((el) => el.total_seats_sold),
        },
        {
          ...this.lineChartData.datasets[2],
          data: mockList.map((el) => el.total_bookings),
        },
      ],
    };
  }
}
