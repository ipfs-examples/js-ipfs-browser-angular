import { Component, OnInit } from '@angular/core';
import { OrbitDbInited, OrbitDbService } from 'src/app/services/orbit-db.service';

@Component({
  selector: 'app-orbit-db-status',
  templateUrl: './orbit-db-status.component.html',
  styleUrls: ['./orbit-db-status.component.css']
})
export class OrbitDbStatusComponent implements OnInit {
  loading = true;
  orbitDbData: OrbitDbInited | null = null;
    constructor(private orbitDbService: OrbitDbService) { }

  ngOnInit(): void {
    this.orbitDbService.orbitInited$.subscribe((orbitInited: OrbitDbInited | null) => {
      if (orbitInited) {
        this.orbitDbData = orbitInited;
        this.loading = false;
      }
    })
  }

}
