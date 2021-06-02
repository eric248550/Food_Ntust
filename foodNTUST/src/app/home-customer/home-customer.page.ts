import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.page.html',
  styleUrls: ['./home-customer.page.scss'],
})
export class HomeCustomerPage implements OnInit {
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
