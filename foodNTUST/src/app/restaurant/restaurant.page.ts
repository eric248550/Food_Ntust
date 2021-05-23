import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  url_restaurant: string='http://localhost:5000/getRestaurant';
  data_restaurant: any[];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get<any>(this.url_restaurant, requestOptions).subscribe(data => {
      this.data_restaurant = data.Data;

      console.log(this.data_restaurant);
    });
  }
}
