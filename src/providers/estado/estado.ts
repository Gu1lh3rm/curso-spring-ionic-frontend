import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../config/api.config';
import { EstadoDTO } from './estado.dto';

@Injectable()
export class EstadoProvider {

  constructor(
    public http: HttpClient
    ) {
   
  }

  public findAll() : Observable<EstadoDTO[]>  {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/api/estados`);
  }

}