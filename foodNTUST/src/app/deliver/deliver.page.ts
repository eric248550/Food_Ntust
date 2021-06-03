import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.page.html',
  styleUrls: ['./deliver.page.scss'],
})
export class DeliverPage implements OnInit {
  url_cookingFood: string='http://140.118.122.118:5000/getCookingFood';
  url_DeliveringFood: string='http://140.118.122.118:5000/getDeliveringFood';
  url_toDeliver: string='http://140.118.122.118:5000/toDeliver';
  data_cookingFood: any[]=[];
  email: string;
  name: string;
  deliver_object: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private Router : Router,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.email = await this.storage.get('email');

    this.getDeliveringFood();
    this.getCookingFood();
    
  }

  getDeliveringFood(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    this.http.get<any>(this.url_DeliveringFood, requestOptions).subscribe(data => {
      console.log(data.Data);
      // check if have order
      for(let i=0; i<data.Data.length;i++){
        console.log(data.Data[i][10]);
        console.log(this.email);
        if(data.Data[i][10] == this.email){
          this.Router.navigate(['/deliver-detail']);
        }else{
          this.storage.remove("deliver_object");
        }
      }
    });
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
      console.log(data.Data);
      for(let i=0; i<data.Data.length;i++){
        if(i>0){
          if (data.Data[i][1] != data.Data[i-1][1]){
            this.data_cookingFood.push({id: data.Data[i][1], email: data.Data[i][3], location: data.Data[i][5]});
          }
        }
        else{
          this.data_cookingFood.push({id: data.Data[i][1], email: data.Data[i][3], location: data.Data[i][5]});
        }
      }
      console.log(this.data_cookingFood);
    });
  }

  async toDeliver(order_id,email){
    console.log(order_id, email);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body={"order_id":order_id, "deliver_email":email}
    this.http.post<any>(this.url_toDeliver, body, requestOptions).subscribe(data => {
      console.log(data);
    });
    await this.storage.set('deliver_object', order_id);
    this.Router.navigate(['/deliver-detail']);
  }
}
