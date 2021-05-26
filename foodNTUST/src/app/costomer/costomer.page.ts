import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-costomer',
  templateUrl: './costomer.page.html',
  styleUrls: ['./costomer.page.scss'],
})
export class CostomerPage implements OnInit {
  url_getCustomerFood: string='http://localhost:5000/getCustomerFood';
  email: string;
  name: string;
  //order info
  order_id :string;
  cooking_food_1: any[]=[];
  cooking_food_2: any[]=[];
  cooking_id: any[]=[];
  deliver_food_1: any[]=[];
  deliver_food_2: any[]=[];
  deliver_id: any[]=[];

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private Router : Router,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.email = await this.storage.get('email');

    this.getDeliverFood(this.email);
  }

  getDeliverFood(email){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body={"email": email}
    this.http.post<any>(this.url_getCustomerFood, body, requestOptions).subscribe(data => {
      console.log(data.Data);

      // get order id
      for(let i=0;i<data.Data.length;i++){
        if(data.Data[i][9] == 'delivering'){
          if(i==0){
            this.deliver_id.push({id: data.Data[i][1]})
          }else{
            // filter the repeat id
            let cnt=0;
            for(let j=0;j<i;j++){
              if(data.Data[i][1] != data.Data[j][1]){
                cnt+=1;
                if(cnt == i){
                  this.deliver_id.push({id: data.Data[i][1], index:i})
                }
              }
            }
          }
          this.deliver_food_1.push({id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]});
        }else if(data.Data[i][9] == 'cooking'){
          if(i==0){
            this.cooking_id.push({id: data.Data[i][1]})
          }else{
            // filter the repeat id
            let cnt=0;
            let food_cnt=1;
            let food_id='';
            for(let j=0;j<i;j++){
              if(data.Data[i][1] != data.Data[j][1]){
                cnt+=1;
                if(cnt == i){
                  food_id = data.Data[i][1];
                }
              }else{
                food_cnt+=1;
              }
              this.cooking_id.push({id: food_id, food_num:food_cnt})
            }
          }
          this.cooking_food_1.push({id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]});
        }
      }
      //get order info
      
      //for(let i=0;i<;i++){}
      //console.log(this.deliver_id);
      console.log(this.cooking_id);
      //console.log(this.deliver_food_1);
      //console.log(this.cooking_food_1);
      
    });
  }
}
