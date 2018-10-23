import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';
import { CameraOptions, Camera, PictureSourceType } from '@ionic-native/camera';
import { storage } from 'firebase';
import {Md5} from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';
import { ClienteFileDTO } from '../../models/cliente-file.dto';
import { FileDTO } from '../../models/file.dto';
import { RefDTO } from '../../models/ref.dto';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  referencia;
  arquivo;
  
  public bucketUrl: string = API_CONFIG.bucketBaseUrl;
  public cliente: ClienteDTO;
  public picture: string;
  public cameraOn: boolean;
  public fileDTO: FileDTO;
  public refDTO: RefDTO;
  public clienteFile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageProvider: StorageProvider, 
    public clienteProvider: ClienteProvider,
    private authService: AuthService,
    public camera: Camera,
    public http: HttpClient
    ) {
  }

  ionViewDidLoad() {
    let localUser = this.storageProvider.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteProvider.findByEmail(localUser.email)
      .subscribe(response => {        

        this.cliente = response as ClienteDTO;  

      }, error => {
        if (error.status == 403) {
          this.authService.signOut();
        }
      });
    }
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.PNG,
     mediaType: this.camera.MediaType.PICTURE
   }
   
   this.camera.getPicture(options).then((imageData) => {
    this.picture = 'data:image/png;base64,' + imageData;
    this.cameraOn = false;
   }, (err) => {
   });
  }

  async takePhoto() {
    // Defining camera options
    try{
      
      let hash = Md5.hashStr(this.cliente.email + this.cliente.id);
      this.cameraOn = true;
      const options: CameraOptions = {
       quality: 100,
       targetHeight: 600,
       targetWidth: 600,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.PNG,
       mediaType: this.camera.MediaType.PICTURE
      }
  
      const result = await this.camera.getPicture(options);
  
      const image = `data:image/jpeg;base64,${result}`;
  
      const pictures = storage().ref(`${API_CONFIG.clienteImgBasePath}/${hash}`);
      
      pictures.putString(image, 'data_url').then(snapshot => {
        this.findImageFirebaseById(API_CONFIG.clienteImgBasePath, `${hash}`)
        .subscribe(response => {
             
            this.getFirebaseDownloadUrl(pictures).subscribe(download_result => {
              response.downloadUrl = download_result;

              this.cliente.file.downloadUrl = download_result;
  
              response.path = API_CONFIG.clienteImgBasePath;
              
              this.fileDTO = response;
              this.refDTO = {id: this.cliente.id}
  
              this.clienteFile = this.fileDTO;
              this.clienteFile.cliente = this.refDTO;
  
              this.clienteInsertPicture(this.clienteFile);
  
            });  
            
        });
      });

      
    } catch(e) {
      console.error(e);
    }
  }

  clienteInsertPicture(obj: ClienteFileDTO) {
    this.clienteProvider.clienteInsertPicture(obj)
    .subscribe(cliente_file_response => {
      console.log(cliente_file_response);
    }, error => {})
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
