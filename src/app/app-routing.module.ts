import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './pages/articles-list/articles-list.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { SingleArticleComponent } from './pages/single-article/single-article.component';
import { StatusPageComponent } from './pages/status-page/status-page.component';

const routes: Routes = [{
  component: ArticlesListComponent,
  path: '',
}, {
  component: SingleArticleComponent,
  path: 'single/:id'
}, {
  component: CreateArticleComponent,
  path: 'create-article'
}, {
  component: StatusPageComponent,
  path: 'status'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
