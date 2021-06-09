import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit {
  email: string;
  name: string;
  url_getFoodList: string = 'http://140.118.122.118:5000/getGetOrderFoodbyRestaurant';
  url_cookFinish: string = 'http://140.118.122.118:5000/cookFinish';
  preparing_id: any[]=[];
  preparing_data: any[][]=[];
  preparing_price: any[]=[];

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

    this.getFoodList(this.name);
  }

  async cookFinish(order_id){
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
          this.http.post<any>(this.url_cookFinish, body, requestOptions).subscribe(data => {
          });
          Successful.present();
        }
      }]
    });

    confirmation.present();
  }

  getFoodList(restaurant){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': "content-type",
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let body={"restaurant": restaurant}
    this.http.post<any>(this.url_getFoodList, body, requestOptions).subscribe(data => {
      console.log(data.Data);
      // get order id
      for(let i=0;i<data.Data.length;i++){
        // get preparing id
        if(data.Data[i][9] == 'preparing'){
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
      for(let j=0;j<this.preparing_id.length;j++){
        console.log(this.preparing_id.length);
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
    });
    console.log(this.preparing_id);
    console.log(this.preparing_data);
  }
  
}
