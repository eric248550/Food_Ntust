import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.page.html',
  styleUrls: ['./food-menu.page.scss'],
})
export class FoodMenuPage implements OnInit {
  url_foodMenu: string='http://localhost:5000/getFoodMenu';
  data_foodMenu: any[]=[];
  search_foodMenu: any[]=[]; // for search data
  restaurant_ID: string;
  cart: any[]=[];
  cart_length:number;
  searchValue: string;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private Router : Router,
    private storage: Storage,
    ) { }

  async ngOnInit() {
    await this.storage.create();
    this.cart = await this.storage.get('cart');
    this.cart_length = this.cart.length

    this.restaurant_ID = this.activatedRoute.snapshot.paramMap.get('restaurant_ID');
    this.getFoodMenu(this.restaurant_ID);
    console.log(this.restaurant_ID);
  }

  async search(evt) {
    const searchTerm = evt.srcElement.value;
    //console.log(searchTerm);
    // if input is empty => original data
    if (!searchTerm) {
      this.search_foodMenu = this.data_foodMenu;
      return;
    }
    // search data if contain
    this.search_foodMenu = this.data_foodMenu.filter(currentFood => {
      if (currentFood.name && searchTerm) {
        return (currentFood.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  /*
  search(event){
    this.search_foodMenu = []; // init
    let search = event.detail.value;

    for(let i=0; i<this.data_foodMenu.length; i++){
      // Find same with search
      if(this.data_foodMenu[i].name == search){
        if(this.search_foodMenu.length == 0){
          this.search_foodMenu.push(this.data_foodMenu[i]);
        }else{
          for(let i=0; i<this.search_foodMenu.length; i++){
            // Check if search already in array
            if(this.search_foodMenu[i].name != search){
              this.search_foodMenu.push(this.data_foodMenu[i]);
            }
          }
        }
      }
    }
    // no type situation
    if(search == ''){
      this.search_foodMenu = this.data_foodMenu;
    }
  }
  */

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

      this.search_foodMenu = this.data_foodMenu;
    });
  }
}

