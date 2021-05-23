import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.page.html',
  styleUrls: ['./food-menu.page.scss'],
})
export class FoodMenuPage implements OnInit {
  url_foodMenu: string='http://localhost:5000/getFoodMenu';
  data_foodMenu: any[];
  restaurant_ID: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    ) { }

  ngOnInit() {
    this.restaurant_ID = this.activatedRoute.snapshot.paramMap.get('restaurant_ID');
    this.getFoodMenu(this.restaurant_ID);
    console.log(this.restaurant_ID);
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
      this.data_foodMenu = data.Data;
      console.log(this.data_foodMenu);
    });
  }
  /*
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
  */
}

