import { Versao } from './../../enum/versao.enum';
import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { Router } from '@angular/router';
import { AuthBaseService } from '../../providers/service/auth/auth-base.service';

@Component({
  selector: 'page_Criar_Atividade_Finalizacao_Professor',
  templateUrl: 'page_Criar_Atividade_Finalizacao_Professor.html',
  styleUrls: ['./page_Criar_Atividade_Finalizacao_Professor.scss']
})
export class Page_Criar_Atividade_Finalizacao_Professor implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
  user: any;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public router: Router,
    public platform: Platform,
    public authBaseService: AuthBaseService) {}
    versao = Versao.numero;
  async ngAfterViewInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {

      if (res.user) {
        this.user = res.user;
      }

    });
    const appEl = this.doc.querySelector('ion-app');
  }
  
  file: File;
  changeListener($event) : void {
     this.file = $event.target.files[0];
   }
 
   saveProfile_click() {
     console.log("saveProfile_click");
     // Add your code here
     /*this.afAuth.authState.take(1).subscribe(auth => {
       this.afDatabase.object(`profile/${this.uid}`).set(this.profile)
         .then(() => {
           this.uploadProfileImage();
           this.navCtrl.pop();
         });
     })*/
   }
 
   uploadProfileImage(){
     /*console.log("uploadProfileImage");
     let fileRef = firebase.storage().ref('profileImages/' + this.uid + ".jpg");
     fileRef.put(this.file).then(function(snapshot) {
       console.log('Uploaded a blob or file!');
     });*/
   }
   
  irVoltar() {
    this.router.navigateByUrl('/pageMenuAtividadesProfessor');
  }
  irFinalizar() {
    this.router.navigateByUrl('/pageMenuAtividadesProfessor');
  }
}
