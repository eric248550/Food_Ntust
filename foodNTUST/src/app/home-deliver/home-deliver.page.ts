import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-deliver',
  templateUrl: './home-deliver.page.html',
  styleUrls: ['./home-deliver.page.scss'],
})
export class HomeDeliverPage implements OnInit {
  name: string;

  constructor(
    private storage: Storage,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    this.name = await this.storage.get('name');
    console.log(this.name);
  }

}
