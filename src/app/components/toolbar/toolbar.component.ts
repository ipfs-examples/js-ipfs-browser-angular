import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public toolbarService: ToolbarService, private router: Router) { }

  ngOnInit(): void {
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
