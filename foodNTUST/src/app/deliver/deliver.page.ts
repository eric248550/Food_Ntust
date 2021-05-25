import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-deliver',
  templateUrl: './deliver.page.html',
  styleUrls: ['./deliver.page.scss'],
})
export class DeliverPage implements OnInit {
  url_cookingFood: string='http://localhost:5000/getCookingFood';
  data_cookingFood: any[]=[];
  heroes:any[]=[];
  email: string;
  name: string;
  /*
  heroes: any[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];
  */
  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    this.email = await this.storage.get('email');
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
      //this.data_cookingFood = data.Data;
      for(let i=0; i<data.Data.length;i++){
        this.data_cookingFood.push({id: data.Data[i][0], location: data.Data[i][3]});
      }
      console.log(this.data_cookingFood);
    });
  }
}
