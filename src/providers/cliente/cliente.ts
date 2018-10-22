import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { StorageProvider } from '../storage/storage';
import { ClienteNewDTO } from '../../models/cliente.new.dto';
import { Observable } from 'rxjs';
import { FileDTO } from '../../models/file.dto';
import { ClienteFileDTO } from '../../models/cliente-file.dto';
import { Md5 } from 'ts-md5';




@Injectable()
export class ClienteProvider {
  
  constructor(public http: HttpClient, public storage: StorageProvider){}
  

  findByIdCliente(id: string){
    return this.http.get(`${API_CONFIG.baseUrl}/api/clientes/${id}`);
  }

  findByEmail(email: string){
    //let token = this.storage.getLocalUser().token;
    //let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});
    return this.http.get(`${API_CONFIG.baseUrl}/api/clientes/email?value=${email}`);
  }

  clienteInsert(obj : ClienteNewDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/api/clientes`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  clienteInsertPicture(obj : ClienteFileDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/api/clientes/picture`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  findImageFirebaseById(path: string, hash : string) {
    return this.http.get<FileDTO>(API_CONFIG.bucketBaseUrl + "/" + path + "%2F" + hash);
  }

  getFirebaseDownloadUrl(pictures): Observable<any> {
    return new Observable((observe) => {
      pictures.getDownloadURL().then(
        downloadURL => {
          observe.next(downloadURL);            
        }         
      ).catch(error => {});
    })
  }

}
