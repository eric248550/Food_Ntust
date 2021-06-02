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
  //preparing->waiting->delivering->finish
  order_id :string;
  deliver_id: any[]=[];
  deliver_data: any[][]=[];
  deliver_price: any[]=[];
  search_deliver_data: any[][]=[];

  waiting_id: any[]=[];
  waiting_data: any[][]=[];
  waiting_price: any[]=[];
  search_waiting_data: any[][]=[];

  preparing_id: any[]=[];
  preparing_data: any[][]=[];
  preparing_price: any[]=[];
  search_preparing_data: any[][]=[];

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

    this.getFoodList(this.email);

  }

  // search from type
  async search_type(evt) {
    const searchTerm = evt.srcElement.value;
    //console.log(searchTerm);
    // if input is empty => original data
    if (!searchTerm) {
      this.search_deliver_data = this.deliver_data;
      this.search_waiting_data = this.waiting_data;
      this.search_preparing_data = this.preparing_data;
      return;
    }
    // set other data to empty
    if(searchTerm == 'Waiting for deliver'){
      this.search_deliver_data = [];
      this.search_waiting_data = this.waiting_data;
      this.search_preparing_data = [];
    }else if(searchTerm == 'delivering'){
      this.search_deliver_data = this.deliver_data;
      this.search_waiting_data = [];
      this.search_preparing_data = [];
    }else if(searchTerm == 'preparing'){
      this.search_deliver_data = [];
      this.search_waiting_data = [];
      this.search_preparing_data = this.preparing_data;
    }
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

  getFoodList(email){
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
        // get delivering id
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
          // get cooking id
        }else if(data.Data[i][9] == 'waiting for deliver'){
          if(i==0){
            this.waiting_id.push({id: data.Data[i][1]})
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
                  this.waiting_id.push({id: food_id})
                }
              }else{
                food_cnt+=1;
              }
            }
          } 
        }else if(data.Data[i][9] == 'preparing'){
          if(i==0){
            this.preparing_id.push({id: data.Data[i][1]})
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
                  this.preparing_id.push({id: food_id})
                }
              }else{
                food_cnt+=1;
              }
            }
          }
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
      for(let j=0;j<this.waiting_id.length;j++){
        this.waiting_data.push([]);
        this.waiting_price.push(0);
      }
      //get ordering info
      for(let i=0;i<data.Data.length;i++){
        for(let j=0;j<this.waiting_id.length;j++){

          if(this.waiting_id[j].id == data.Data[i][1]){
            this.waiting_data[j].push({index:j, id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]})
            this.waiting_price[j] += data.Data[i][8];
          }
        }
      }

      //Make empty array due to length of order
      for(let j=0;j<this.preparing_id.length;j++){
        this.preparing_data.push([]);
        this.preparing_price.push(0);
      }
      //get preparing info
      for(let i=0;i<data.Data.length;i++){
        for(let j=0;j<this.preparing_id.length;j++){

          if(this.preparing_id[j].id == data.Data[i][1]){
            this.preparing_data[j].push({index:j, id: data.Data[i][1], name: data.Data[i][4], price: data.Data[i][8], status: data.Data[i][9]})
            this.preparing_price[j] += data.Data[i][8];
          }
        }
      }
      // backup original data
      this.search_deliver_data = this.deliver_data;
      this.search_waiting_data = this.waiting_data;
      this.search_preparing_data = this.preparing_data;
    });
  }
}
