import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CategoriaDTO } from './categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class CategoriaProvider {

  constructor(
    public http: HttpClient
    ) {
   
  }

  public findAll(): Observable<CategoriaDTO[]>  {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

  public findAllBucketUrl(name,id): Observable<any>{
    return this.http.get<any>(`${API_CONFIG.bucketBaseUrl}/${name}${id}.jpg`);
  }

}
