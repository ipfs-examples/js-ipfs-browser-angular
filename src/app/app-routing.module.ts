import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';

const routes: Routes = [{
  component: ArticlesListComponent,
  path: '',
}, {
  component: SingleArticleComponent,
  path: 'single/:id'
}, {
  component: CreateArticleComponent,
  path: 'create-article'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
