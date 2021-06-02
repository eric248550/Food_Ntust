import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-restaurant',
  templateUrl: './home-restaurant.page.html',
  styleUrls: ['./home-restaurant.page.scss'],
})
export class HomeRestaurantPage implements OnInit {

  name: string;
  constructor(
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    //console.log(this.name);
  }

}
