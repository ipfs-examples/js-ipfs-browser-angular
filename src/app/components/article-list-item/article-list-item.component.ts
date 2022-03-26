import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export interface ArticleListItem {
  title: string;
  html: string;
  thumbnail: string;
}

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListItemComponent implements OnInit {
  @Input()
  article: ArticleListItem | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
