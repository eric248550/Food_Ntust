import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-restaurant-setting',
  templateUrl: './restaurant-setting.page.html',
  styleUrls: ['./restaurant-setting.page.scss'],
})
export class RestaurantSettingPage implements OnInit {
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
