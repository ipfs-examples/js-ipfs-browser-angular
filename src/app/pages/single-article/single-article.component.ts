import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, from, of, switchMap } from 'rxjs';
import { ArticleDTO, OrbitDbService } from 'src/app/services/orbit-db.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {
  article: ArticleDTO | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orbitDbService: OrbitDbService,
    public sanitizer: DomSanitizer,
    private toolbarService: ToolbarService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return from(this.orbitDbService.getSingleArticle(params.id))
      }),
      catchError((err) => {
        this.error();
        console.error(err);
        return of(err)
      })
    ).subscribe((article) => {
      console.log('load article', article);
      this.article = article;
      this.toolbarService.setTitle(article.title);
      this.toolbarService.backButton = true;

    });
  }

  error(): void {
    this.matSnackBar.open('Cannot load article', 'back');
  }

}
