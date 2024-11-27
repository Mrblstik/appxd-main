import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.page.html',
  styleUrls: ['./historial-viajes.page.scss'],
})
export class HistorialViajesPage implements OnInit {

  viajes = [
    { fecha: new Date('2024-11-02'), costo: 8200, patente: 'RD-KL-34', chofer: 'Carlos Gómez' },
    { fecha: new Date('2024-11-05'), costo: 9500, patente: 'XY-PQ-75', chofer: 'Ana Ramírez' },
    { fecha: new Date('2024-11-08'), costo: 6400, patente: 'MN-OP-66', chofer: 'Luis Martínez' },
  ];
  

  constructor() { }

  ngOnInit() {}
}
