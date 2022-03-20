import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles = [{
    title: 'test',
    description: 'testDescription'
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
