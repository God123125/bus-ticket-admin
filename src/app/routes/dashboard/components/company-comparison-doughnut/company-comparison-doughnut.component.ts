import { Component, input, SimpleChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-company-comparison-doughnut',
  imports: [BaseChartDirective, TranslatePipe],
  templateUrl: './company-comparison-doughnut.component.html',
  styleUrl: './company-comparison-doughnut.component.scss',
})
export class CompanyComparisonDoughnutComponent {
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
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData']) {
      this.updateChartData();
    }
  }
  updateChartData() {
    const chartData = this.chartData();
    this.doughnutChartData = {
      labels: ['ក្រុមហ៊ុនកំពុងដំណើរការ', 'ក្រុមហ៊ុនផ្អាកដំណើរការ'],
      datasets: [
        {
          data: [chartData.activeCompany, chartData.inactiveCompany],
          backgroundColor: ['#22c55e', '#f59e0b'],
          hoverBackgroundColor: ['#16a34a', '#d97706'],
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };
  }
}
