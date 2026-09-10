import { Component, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-booking-status-chart',
  imports: [BaseChartDirective, TranslatePipe],
  templateUrl: './booking-status-chart.component.html',
  styleUrl: './booking-status-chart.component.scss',
})
export class BookingStatusChartComponent implements OnChanges {
  fontFamily: string = 'KhReg';
  chartData = input<any>();

  doughnutChartOption: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
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
          padding: 16,
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

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['បានជោគជ័យ', 'រង់ចាំការទូទាត់', 'បានបោះបង់'],
    datasets: [
      {
        data: [120, 35, 15],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#d97706', '#dc2626'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  constructor(private translateService: TranslateService) {
    this.setMockChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChartData();
    }
  }

  updateChartData() {
    const list = this.chartData();
    this.doughnutChartData = {
      labels: list.map((el: any) =>
        this.translateService.instant(`${el.booking_status.toLowerCase()}`),
      ),
      datasets: [
        {
          data: list.map((el: any) => el.count ?? 0),
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7'],
          hoverBackgroundColor: ['#16a34a', '#d97706', '#dc2626', '#2563eb', '#9333ea'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }

  setMockChartData() {
    const mockList = [
      { label: 'បានជោគជ័យ', count: 120 },
      { label: 'រង់ចាំការទូទាត់', count: 35 },
      { label: 'បានបោះបង់', count: 15 },
    ];
    this.doughnutChartData = {
      labels: mockList.map((el) => el.label),
      datasets: [
        {
          data: mockList.map((el) => el.count),
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
          hoverBackgroundColor: ['#16a34a', '#d97706', '#dc2626'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }
}
