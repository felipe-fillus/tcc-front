import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { UsuarioEventService } from './providers/service/usuarioEvent.service';
import { AuthBaseService } from './providers/service/auth/auth-base.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  dark = false;
  usuarioTipo: string = '';
  user: any;
  openHeader = false;
  loggedIn = false;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authBaseService: AuthBaseService,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.authBaseService.watchLoggedUser().subscribe((res) => {
      if (res.user.email) {
        this.user = res.user;
        this.loggedIn = true;
        this.usuarioTipo = this.capitalizeFirstLetter(this.user.tipo);

        this.openHeaderVerify();
      } else {
        this.loggedIn = false;

        this.openHeaderVerify();
      }
    });

    this.authBaseService.setLoggedUser();
    this.getUserData();
  }

  capitalizeFirstLetter(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }


  openHeaderVerify() {
    const pageAtividade = window.location.href.includes('pageFazerAtividadeAluno') ? false : true;
    const pageLogin = window.location.href.includes('pageLogin') ? false : true;
    if (pageAtividade && pageLogin && this.loggedIn) {
      this.openHeader = true;
    } else {
      this.openHeader = false;
    }
  }

  getUserData(): void {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
