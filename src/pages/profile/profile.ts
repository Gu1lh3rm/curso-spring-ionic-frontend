import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../providers/auth/auth-service';
import { CameraOptions, Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageProvider, 
    public clienteProvider: ClienteProvider,
    private authService: AuthService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
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

}
