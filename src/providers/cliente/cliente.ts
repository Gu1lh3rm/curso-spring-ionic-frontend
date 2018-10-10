import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageProvider } from '../storage/storage';
import { auth } from 'firebase';

@Injectable()
export class ClienteProvider {

  constructor(public http: HttpClient, public storage: StorageProvider) {}

  findByEmail(email: string) : Observable<ClienteDTO> {
    //let token = this.storage.getLocalUser().token;
    //let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/api/clientes/email?value=${email}`);
  }

}
