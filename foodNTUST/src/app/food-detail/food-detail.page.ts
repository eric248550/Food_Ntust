import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

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
  restaurant_ID: string;
  name: string;
  email: string;
  cart: any[]=[];
  cart_length:number;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    public alertController: AlertController,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.email = await this.storage.get('email');
    this.cart = await this.storage.get('cart');
    this.cart_length = this.cart.length

    this.food_ID = this.activatedRoute.snapshot.paramMap.get('food_ID');
    this.restaurant_ID = this.activatedRoute.snapshot.paramMap.get('restaurant_ID');
    // const dispenserID = paramMap.get('food_ID');
    this.getFoodMenu(this.restaurant_ID);
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
      for(let i=0;i<data.Data.length;i++){
        if(data.Data[i][0] == this.food_ID){
          this.data_foodMenu = data.Data[i];
        }
      }
      
    });
  }

  async addCart(food_id, food_name, food_restaurant, food_price){
    this.cart = await this.storage.get('cart');
    if(this.cart.length == 0){
      this.cart.push({id: food_id, name: food_name, restaurant:food_restaurant, price:food_price, email:this.email});
    }
    else if(this.cart[0].restaurant == food_restaurant){
      this.cart.push({id: food_id, name: food_name, restaurant:food_restaurant, price:food_price, email:this.email});
    }
    else{
      const fail = await this.alertController.create({
        header: 'Fail!',
        message: 'Your Select different restaurant, please check cart',
        buttons: [{
          text: 'OK',
        }]
      });
      fail.present();
    }
    await this.storage.set('cart', this.cart);

    this.cart = await this.storage.get('cart');
    this.cart_length = this.cart.length
    console.log(this.cart)
  }

  async send_order(order_ID,email){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = {"food_id": order_ID, "email": email}

    const Successful = await this.alertController.create({
      header: 'Successful!',
      message: 'Your food order is successful, press OK back to menu',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.Router.navigate(['/food-menu',this.restaurant_ID]);
        }
      }]
    });

    const confirmation = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure to order This food?',
      buttons: ['Cancel',{
        text: 'OK',
        handler: () => {
          this.http.post<any>(this.url_orderFood, body, requestOptions).subscribe(data => {
            console.log(data);
          });
          Successful.present();
        }
      }]
    });

    await confirmation.present();
  }
  
}
