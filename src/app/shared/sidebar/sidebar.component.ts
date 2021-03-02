import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {



  private _historial: string[] = [];
  get historial(){
    return this.gifsService.historial;
  }
  buscar(termino: string){
    this.gifsService.buscarGifs(termino)
  }

  constructor(private gifsService: GifsService) { }



}
