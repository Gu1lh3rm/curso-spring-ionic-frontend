import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { StorageProvider } from '../storage/storage';
import { ClienteNewDTO } from '../../models/cliente.new.dto';

@Injectable()
export class ClienteProvider {

  constructor(public http: HttpClient, public storage: StorageProvider) {}

  findByEmail(email: string){
    //let token = this.storage.getLocalUser().token;
    //let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
    return this.http.get(`${API_CONFIG.baseUrl}/api/clientes/email?value=${email}`);
  }

  clienteInsert(obj : ClienteNewDTO) {
    console.log("teste nice");
    console.log(obj);
    return this.http.post(
      `${API_CONFIG.baseUrl}/api/clientes`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

}
