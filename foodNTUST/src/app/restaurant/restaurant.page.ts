import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  url_restaurant: string='http://140.118.122.118:5000/getRestaurant';
  data_restaurant: any[]=[];
  search_restaurant: any[]=[];
  name:string;
  cart: any[]=[];
  cart_length:number;
  blob: Blob;
  blobURL: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.cart = await this.storage.get('cart');
    this.cart_length = this.cart.length

    this.getRestaurant();

  }
  // search from type
  async search_type(evt) {
    const searchTerm = evt.srcElement.value;
    //console.log(searchTerm);
    // if input is empty => original data
    if (!searchTerm) {
      this.search_restaurant = this.data_restaurant;
      return;
    }
    // search data if contain
    this.search_restaurant = this.data_restaurant.filter(currentFood => {
      if (currentFood.type && searchTerm) {
        return (currentFood.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
  // search from word
  async search(evt) {
    const searchTerm = evt.srcElement.value;
    //console.log(searchTerm);
    // if input is empty => original data
    if (!searchTerm) {
      this.search_restaurant = this.data_restaurant;
      return;
    }
    // search data if contain
    this.search_restaurant = this.data_restaurant.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  getRestaurant(){
    //this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
  
      // create blobURL, such that we could use it in an image element:
      //this.blobURL = URL.createObjectURL(this.blob);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get<any>(this.url_restaurant, requestOptions).subscribe(async data => {

      for(let i=0; i<data.Data.length;i++){
        this.data_restaurant.push({id: data.Data[i][0], name: data.Data[i][1], address: data.Data[i][2], type:data.Data[i][3], img: data.Data[i][4]});
      }
      this.search_restaurant = this.data_restaurant;
    });
  }
}
