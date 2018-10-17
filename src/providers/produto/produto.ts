import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from './produto.dto';

@Injectable()
export class ProdutoProvider {

  constructor(public http: HttpClient) {
    
  }

  findByCategoria(categoria_id : number) {
    return this.http.get(`${API_CONFIG.baseUrl}/api/produtos/page?categorias=${categoria_id}`);
  }

  findProdutoById(produto_id : number) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/api/produtos/${produto_id}`);
  }

}
