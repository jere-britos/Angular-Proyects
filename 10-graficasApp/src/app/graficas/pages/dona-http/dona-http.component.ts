import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {
  public doughnutChartLabels: string[] = [ 
    // 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' 
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      // { data: [ 
      //   350, 450, 100 
      // ],
      //   backgroundColor: ['#6405F0','#0724E3', '#05A0F0'] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
 // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  
  constructor( private graficasService: GraficasService ) { }

  ngOnInit(): void {
    
    // this.graficasService.getUsuariosRedesSociales()
    //   .subscribe(data => {
    //     const labels = Object.keys(data);
    //     const datos = Object.values(data);

    //     this.doughnutChartData = {
    //       labels: Object.keys(data),
    //       datasets:[
    //         {
    //           data: Object.values(data)
    //         }
    //       ]
    //     }
    //   })

    this.graficasService.getUsuariosRedesSocialesDonaData()
    .subscribe(({ labels, datasets }) => {
      // console.log(data);
      this.doughnutChartData = { labels, datasets };

	})

    //Fin del ngOnInit
  }

}
