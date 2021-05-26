import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

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
  url_orderFood: string = 'http://localhost:5000/orderFood';

  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    private http: HttpClient,
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
    this.http.post<any>(this.url_orderFood, body, requestOptions).subscribe(data => {
      console.log(data);
    });
    //clean cart
    await this.storage.remove('cart');
    await this.storage.set('cart', []);
    this.Router.navigate(['/restaurant']);
  }
}
