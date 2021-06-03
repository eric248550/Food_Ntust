import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: any[]=[];
  food_ID: string;
  restaurant_ID: string;
  email:string;
  body: any;
  url_orderFood: string = 'http://140.118.122.118:5000/orderFood';

  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    private http: HttpClient,
    public alertController: AlertController,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.cart = await this.storage.get('cart');
    this.email = await this.storage.get('email');

    this.food_ID = this.activatedRoute.snapshot.paramMap.get('food_ID');
    this.restaurant_ID = this.activatedRoute.snapshot.paramMap.get('restaurant_ID');

    console.log(this.cart);
    console.log(this.email);

  }
  async deleteOrder(index){
    this.cart = await this.storage.get('cart');

    this.cart.splice(index,1);
    await this.storage.set('cart', this.cart);
    
  }
  async cleanCart(){
    await this.storage.remove('cart');
    await this.storage.set('cart', []);
    //refresh
    window.location.reload();
  }
  
  async sendOrder(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body = this.cart;

    const Successful = await this.alertController.create({
      header: 'Successful!',
      message: 'Your food order is successful, press OK back to menu',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.storage.remove('cart');
          this.storage.set('cart', []);
          this.Router.navigate(['/home-customer']);
        }
      }]
    });

    const confirmation = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure to order These food?',
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
    confirmation.present();
  }
}
