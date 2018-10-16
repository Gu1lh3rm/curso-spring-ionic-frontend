import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../config/api.config';
import { CidadeDTO } from './cidade.dto';

@Injectable()
export class CidadeProvider {

  constructor(
    public http: HttpClient
    ) {
   
  }

  public findAll(estado_id: string) : Observable<CidadeDTO[]>  {
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/api/estados/${estado_id}/cidades`);
  }

}