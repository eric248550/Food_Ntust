import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.page.html',
  styleUrls: ['./login-in.page.scss'],
})
export class LoginInPage implements OnInit {
  url_login: string='http://localhost:5000/login';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    public alertController: AlertController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async login(form) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = form.value;

    const Fail = await this.alertController.create({
      header: 'Login Fail',
      message: 'Please check your email and password again!',
      buttons: [{
        text: 'OK',
      }]
    });

    this.http.post<any>(this.url_login, body, requestOptions).subscribe(async data => {
      let token = data.token;
      let name = jwt_decode(token)["name"];
      let email = jwt_decode(token)["email"];
      let type = jwt_decode(token)["type"];

      if (!data.token){
        console.log("no");
        Fail.present();
      }
      else{
        console.log(name,email);
        await this.storage.set('name', name);
        await this.storage.set('email', email);
        await this.storage.set('type', type);
        await this.storage.set('cart', []);
        let path = '/home-' + type;
        console.log(path);
        this.Router.navigate([path]);
      }
    });
  }
}
