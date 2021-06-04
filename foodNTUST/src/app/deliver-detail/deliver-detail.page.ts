import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deliver-detail',
  templateUrl: './deliver-detail.page.html',
  styleUrls: ['./deliver-detail.page.scss'],
})
export class DeliverDetailPage implements OnInit {
  url_getDeliverFood: string='http://140.118.122.118:5000/getDeliverFood';
  email: string;
  name: string;
  deliver_object: string;
  data_diliverFood: any[]=[];
  //order info
  person :string;
  food_location :string;
  destination :string;
  phone :string;
  total_price :number=0;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private Router : Router,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.email = await this.storage.get('email');
    this.deliver_object = await this.storage.get('deliver_object'); 

    this.getDeliverFood();
  }

  getDeliverFood(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body={"email": this.email}
    this.http.post<any>(this.url_getDeliverFood, body, requestOptions).subscribe(data => {
      console.log(data.Data);
      this.person = data.Data[0][2];
      this.food_location = data.Data[0][5];
      this.destination = data.Data[0][6];
      this.phone = data.Data[0][7];

      for(let i=0;i<data.Data.length;i++){
        this.data_diliverFood.push({name: data.Data[i][4], price: data.Data[i][8]});
        this.total_price = this.total_price + Number(data.Data[0][8]);
      }
      console.log(this.data_diliverFood);

      console.log(this.person, this.food_location, this.destination, this.phone, this.total_price);
    });
  }
}
