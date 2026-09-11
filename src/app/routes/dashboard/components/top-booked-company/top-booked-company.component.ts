import { Component, input, SimpleChanges, ViewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-top-booked-company',
  imports: [BaseChartDirective, TranslatePipe],
  templateUrl: './top-booked-company.component.html',
  styleUrl: './top-booked-company.component.scss',
})
export class TopBookedCompanyComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  fontFamily: string = 'KhReg';
  chartData = input<any>();
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
        stacked: true,
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
        stacked: true,
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
  public barChartData: ChartData<'bar'> = {
    labels: ['iBC', 'Saly VIP', 'Larita', 'VET'],
    datasets: [
      {
        data: [10, 20, 30, 40],
        label: 'ចំនួនការកក់សរុប (Total Bookings)',
        backgroundColor: '#3b82f6',
        hoverBackgroundColor: '#2563eb',
        borderRadius: 6,
        barPercentage: 0.6,
        stack: 'a',
      },
      {
        data: [10, 20, 30, 40],
        label: 'ប្រាក់ចំណូលសរុប (Total Revenue)',
        backgroundColor: '#f6953bff',
        hoverBackgroundColor: '#ebac25ff',
        borderRadius: 6,
        barPercentage: 0.6,
        stack: 'a',
      },
    ],
  };
  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      // this.updateChart();
    }
  }
  updateChart() {
    const data = this.chartData();
    this.barChartData = {
      labels: data.map((item: any) => item.name),
      datasets: [
        {
          data: data.map((item: any) => item.booking_count),
          label: 'ចំនួនការកក់សរុប (Total Bookings)',
          backgroundColor: '#3b82f6',
          hoverBackgroundColor: '#2563eb',
          borderRadius: 6,
          barPercentage: 0.6,
          stack: 'a',
        },
        {
          data: data.map((item: any) => item.total_revenue),
          label: 'ប្រាក់ចំណូលសរុប (Total Revenue)',
          backgroundColor: '#f6953bff',
          hoverBackgroundColor: '#ebac25ff',
          borderRadius: 6,
          barPercentage: 0.6,
          stack: 'a',
        },
      ],
    };
    this.chart?.chart?.update();
  }
}
