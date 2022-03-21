import { Component, OnInit } from '@angular/core';
import { OrbitDbInited, OrbitDbService } from 'src/app/services/orbit-db.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  orbitDbData: OrbitDbInited | null = null;
  loading: boolean = true;

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
