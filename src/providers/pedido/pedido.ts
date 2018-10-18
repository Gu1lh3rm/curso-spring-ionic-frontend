import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoDTO } from '../../models/pedido.dto';
import { API_CONFIG } from '../../config/api.config';

@Injectable()
export class PedidoProvider {

  constructor(public http: HttpClient) {
    
  }

  insertPedido(obj : PedidoDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/api/pedidos`,
    obj,
    {
      observe: 'response',
      responseType: 'text'
    }
    );
  }

}
