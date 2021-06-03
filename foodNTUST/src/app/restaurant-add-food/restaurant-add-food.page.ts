import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-add-food',
  templateUrl: './restaurant-add-food.page.html',
  styleUrls: ['./restaurant-add-food.page.scss'],
})
export class RestaurantAddFoodPage implements OnInit {

  name: string;
  url_alterFoodMenu: string = 'http://140.118.122.118:5000/alterFoodMenu';
  url_deleteFoodMenu: string = 'http://140.118.122.118:5000/deleteFoodMenu';
  url_foodMenu: string='http://140.118.122.118:5000/getFoodMenu';
  data_foodMenu: any[]=[];
  addParameter: boolean;
  addParameter_select: boolean;

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    public alertController: AlertController,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.getFoodMenu(this.name);
    //console.log(this.name);
  }

  async toggleForm(evt) { 
    const searchTerm = evt.srcElement.value;

    if(searchTerm == 'delete'){
      // hide other column
      this.addParameter = false;
      this.addParameter_select = true;
    }else{
      this.addParameter = true;
      this.addParameter_select = false;
    }
    console.log(searchTerm, this.addParameter);
  }

  async alterFoodMenu(form) {
    console.log(form.value);
    console.log(form.value.type);
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
      message: 'Your menu Successfully post',
      buttons: [{
        text: 'OK',
        handler: () => {
          if(form.value.type == 'delete'){
            //delete
            this.http.post<any>(this.url_deleteFoodMenu, body, requestOptions).subscribe(data => {
            });
          }else{ 
            // add & update
            this.http.post<any>(this.url_alterFoodMenu, body, requestOptions).subscribe(data => {
            });
          }
        }
      }]
    });
    const confirmation = await this.alertController.create({
      header: 'Warning!',
      message: 'Check your menu information',
      buttons: [{
        text: 'Cancel',
      },
      {
        text: 'Confirm',
        handler: () => {
          Successful.present();
        }
      }]
    });

    confirmation.present();
  }

  getFoodMenu(restaurant){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = {"restaurant": restaurant}
    this.http.post<any>(this.url_foodMenu, body, requestOptions).subscribe(data => {
      for(let i=0; i<data.Data.length;i++){
        this.data_foodMenu.push({id: data.Data[i][0], name: data.Data[i][1], img: data.Data[i][4]});
      }
      console.log(data.Data);
    });
  }
}
