import { Component, OnInit } from '@angular/core';
import {
  ArticleDTO,
  OrbitDbInited,
  OrbitDbService,
} from 'src/app/services/orbit-db.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  own = true;
  articles: ArticleDTO[] = [];
  loading = true;
  constructor(
    public orbitDb: OrbitDbService,
    private toolbarService: ToolbarService
  ) {}

  async ngOnInit(): Promise<void> {

    this.orbitDb.getArticles$().subscribe((articles: ArticleDTO[]) => {
      console.log('got articles', articles);
      this.articles = articles;
    });
    this.toolbarService.setTitle('List of articles');
    this.toolbarService.setBackButton(false);
  }
}
