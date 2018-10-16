import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class ProdutoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProdutoProvider Provider');
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/api/produtos/page?categorias=${categoria_id}`);
  }

}
