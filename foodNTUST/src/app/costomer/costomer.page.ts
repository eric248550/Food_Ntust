import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-costomer',
  templateUrl: './costomer.page.html',
  styleUrls: ['./costomer.page.scss'],
})
export class CostomerPage implements OnInit {
  url_getCustomerFood: string='http://localhost:5000/getCustomerFood';
  url_orderFinish: string = 'http://localhost:5000/orderFinish';
  email: string;
  name: string;
  //order info
  order_id :string;
  cooking_id: any[]=[];
  deliver_id: any[]=[];
  cooking_data: any[][]=[];
  cooking_price: any[]=[];
  cooking_cnt: any[]=[];
  deliver_data: any[][]=[];
  deliver_price: any[]=[];

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private Router : Router,
    public alertController: AlertController,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.email = await this.storage.get('email');

    this.getDeliverFood(this.email);

  }

  async orderFinish(order_id){
    console.log(order_id);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body={"order_id":order_id}

    const Successful = await this.alertController.create({
      header: 'Successful!',
      message: 'Your food order is Finished!',
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.reload();
        }
      }]
    });

    const confirmation = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure you have receive food?',
      buttons: ['Cancel',{
        text: 'OK',
        handler: () => {
          this.http.post<any>(this.url_orderFinish, body, requestOptions).subscribe(data => {
          });
          Successful.present();
        }
      }]
    });

    confirmation.present();
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
                  this.deliver_id.push({id: data.Data[i][1]})
                }
              }
            }
          }
          //this.deliver_food_1.push({id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]});
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
                  this.cooking_id.push({id: food_id})
                }
              }else{
                food_cnt+=1;
              }
            }
          } 
          //this.cooking_food_1.push({id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]});
        }
      }

      //Make empty array due to length of order
      for(let j=0;j<this.deliver_id.length;j++){
        this.deliver_data.push([]);
        this.deliver_price.push(0);
      }
      //get dlivering info
      for(let i=0;i<data.Data.length;i++){
        for(let j=0;j<this.deliver_id.length;j++){
          if(this.deliver_id[j].id == data.Data[i][1]){
            this.deliver_data[j].push({index:j, id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]})
            this.deliver_price[j] += data.Data[i][8];
          }
        }
      }
      //Make empty array due to length of order
      for(let j=0;j<this.cooking_id.length;j++){
        this.cooking_data.push([]);
        this.cooking_price.push(0);
      }
      //get cooking info
      for(let i=0;i<data.Data.length;i++){
        for(let j=0;j<this.cooking_id.length;j++){

          if(this.cooking_id[j].id == data.Data[i][1]){
            this.cooking_data[j].push({index:j, id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]})
            this.cooking_price[j] += data.Data[i][8];
          }
        }
      }

      console.log(this.deliver_price);
      console.log(this.deliver_data);
      
    });
  }
}
