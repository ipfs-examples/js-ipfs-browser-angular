import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpfsService } from './services/ipfs.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OrbitDbService } from './services/orbit-db.service';
import { IpfsStatusComponent } from './components/ipfs-status/ipfs-status.component';
import { MatButtonModule } from '@angular/material/button';
import { OrbitDbStatusComponent } from './components/orbit-db-status/orbit-db-status.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [AppComponent, IpfsStatusComponent, OrbitDbStatusComponent, ArticlesListComponent, SingleArticleComponent, CreateArticleComponent, ArticleListItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatRippleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [IpfsService, OrbitDbService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private orbitDbService: OrbitDbService) {
    this.orbitDbService.init();
  }
}
