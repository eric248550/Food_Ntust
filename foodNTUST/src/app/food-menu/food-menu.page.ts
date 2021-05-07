import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.page.html',
  styleUrls: ['./food-menu.page.scss'],
})
export class FoodMenuPage implements OnInit {
  url_foodMenu: string='http://localhost:5000/getFoodMenu';
  data_foodMenu: any[];
  constructor(
    private http: HttpClient,
    ) { }

  ngOnInit() {
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

      console.log(this.data_foodMenu);
    });
  }
}

