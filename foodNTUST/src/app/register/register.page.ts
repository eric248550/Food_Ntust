import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  url_register: string='http://localhost:5000/register';

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async register(form) {
    console.log(form.value);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = form.value;

    const Successful = await this.alertController.create({
      header: 'Successful!',
      message: 'Your are Successful register',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.Router.navigate(['/login-in']);
        }
      }]
    });
    const Fail = await this.alertController.create({
      header: 'Fail!',
      message: 'Check your information',
      buttons: [{
        text: 'OK',
      }]
    });
    if(form.value.password != form.value.confirm){
      Fail.present();
    }
    else{
      this.http.post<any>(this.url_register, body, requestOptions).subscribe(data => {
        if(data.flag == false){
          Fail.present();
        }
        else{
          Successful.present();
        }
      });
    }
    

  }

}
