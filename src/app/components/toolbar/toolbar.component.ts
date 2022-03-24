import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrbitDbInited, OrbitDbService } from 'src/app/services/orbit-db.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  menu: any;
  constructor(public toolbarService: ToolbarService, private router: Router, private orbitDb: OrbitDbService) { }

  ngOnInit(): void {
    this.orbitDb.orbitInited$.subscribe(
      (orbitDbInited: OrbitDbInited | null) => {
        if (orbitDbInited!.own) {
          this.toolbarService.setButtons({
            buttons: [
              {
                icon: 'add',
                label: 'New article',
                link: 'create-article'
              },
            ],
          });
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['..']);
  }

  optionClick(button: {link?: string, callback?: Function}): void {
    if (button.link) {
      this.router.navigateByUrl(button.link);
    } else if (button.callback) {
      button.callback();
    }
  }
}
