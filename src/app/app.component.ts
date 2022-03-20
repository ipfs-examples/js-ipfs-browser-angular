import { Component, OnInit } from '@angular/core';
import { IpfsService } from './services/ipfs.service';
import { OrbitDbService } from './services/orbit-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'browser-angular';
  constructor(private orbitDbService: OrbitDbService) {}
  testPut() {
    this.orbitDbService.testPut();
  }


}
