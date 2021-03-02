import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Pagination, Gif } from '../interface/gifs.interface';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = 'i2B9PNRnRTV9LDvfTwObYzAqQC99VlIl';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resutados : Gif [] = [];

  get historial(){
    
    return [...this._historial];
  }
  //consturctor para obtener servicios por http
  constructor(private http: HttpClient){
    //localStorage.getItem('historial')
    //aqui guardamosel historial en local storage
    if (localStorage.getItem('historial')) {
      //se transforma localstorage a json y se obtiene el json como historial de lo contrario nulo
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      
    }
    this.resutados = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs (query: string ){

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {  
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }
  
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query );

    //aqui se obtiene los datos del get por peticion http
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
      .subscribe( (resp : any) => {

        this.resutados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resutados) );
      })
    
  }
}
