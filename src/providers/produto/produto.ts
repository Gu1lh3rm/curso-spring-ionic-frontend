import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from './produto.dto';

@Injectable()
export class ProdutoProvider {

  constructor(public http: HttpClient) {
    
  }

  findByCategoria(categoria_id : number, page : number = 0, linesPerPage : number = 24) {
    return this.http.get(`${API_CONFIG.baseUrl}/api/produtos/page?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  findProdutoById(produto_id : number) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/api/produtos/${produto_id}`);
  }

}
