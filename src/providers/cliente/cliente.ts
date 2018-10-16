import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageProvider } from '../storage/storage';
import { auth } from 'firebase';
import { ClienteNewDTO } from './cliente.new.dto';

@Injectable()
export class ClienteProvider {

  constructor(public http: HttpClient, public storage: StorageProvider) {}

  findByEmail(email: string) : Observable<ClienteDTO> {
    //let token = this.storage.getLocalUser().token;
    //let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/api/clientes/email?value=${email}`);
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
