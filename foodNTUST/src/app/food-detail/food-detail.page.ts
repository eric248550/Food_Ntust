import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
})
export class FoodDetailPage implements OnInit {
  url_foodMenu: string='http://localhost:5000/getFoodMenu';
  url_orderFood: string = 'http://localhost:5000/orderFood';
  data_foodMenu: any[];
  food_ID: string;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.food_ID = this.activatedRoute.snapshot.paramMap.get('food_ID');
    // const dispenserID = paramMap.get('food_ID');
    this.getFoodMenu();
  }

  getFoodMenu(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get<any>(this.url_foodMenu, requestOptions).subscribe(data => {
      this.data_foodMenu = data.Data;

      // console.log(this.data_foodMenu);
    });
  }

  async send_order(order_ID,order_name){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = {"food_id": order_ID, "name": order_name}
    this.http.post<any>(this.url_orderFood, body, requestOptions).subscribe(data => {
      console.log(data)
    });
    console.log(this.data_foodMenu)
    console.log(order_ID)
    console.log(order_name)

    const alert = await this.alertController.create({
      header: 'Successful!',
      message: 'Your food order is successful, press OK back to menu',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.Router.navigate(['/food-menu']);
        }
      }]
    });
    await alert.present();
  }
  
}
