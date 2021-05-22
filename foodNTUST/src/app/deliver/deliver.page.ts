import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.page.html',
  styleUrls: ['./deliver.page.scss'],
})
export class DeliverPage implements OnInit {
  url_cookingFood: string='http://localhost:5000/getCookingFood';
  data_cookingFood: any[];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getCookingFood();
  }

  getCookingFood(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get<any>(this.url_cookingFood, requestOptions).subscribe(data => {
      this.data_cookingFood = data.Data;

      console.log(this.data_cookingFood);
    });
  }
}
