import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
