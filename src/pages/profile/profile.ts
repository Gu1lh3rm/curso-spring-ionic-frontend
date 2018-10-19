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

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  referencia;
  arquivo;
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageProvider: StorageProvider, 
    public clienteProvider: ClienteProvider,
    private authService: AuthService,
    public camera: Camera,
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
      pictures.putString(image, 'data_url').then(function(snapshot) {
        console.log(snapshot);
        
      });

      // let endereco = pictures.getDownloadURL().then(
      //     downloadURL => {
      //       console.log('File available at', downloadURL);
      //       return downloadURL;
      //     }         
      // ).catch(error => {});

      this.teste(pictures).subscribe(result => {
          console.log(result);
          this.cliente.imgUrl = result;
      });
      
      
      //console.log('link para download ', endereco);

    } catch(e) {
      console.error(e);
    }
  }

  teste(pictures): Observable<any> {
      return new Observable((observe) => {
        pictures.getDownloadURL().then(
          downloadURL => {
            observe.next(downloadURL);            
          }         
        ).catch(error => {});
      })
  }
}
