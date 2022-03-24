import { ImageLoaderComponent } from './components/image-loader/image-loader.component';
import { ImageService } from './services/image.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { QuillModule } from 'ngx-quill';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleListItemComponent } from './components/article-list-item/article-list-item.component';
import { ArticlesListComponent } from './pages/articles-list/articles-list.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { IpfsStatusComponent } from './components/ipfs-status/ipfs-status.component';
import { OrbitDbStatusComponent } from './components/orbit-db-status/orbit-db-status.component';
import { SingleArticleComponent } from './pages/single-article/single-article.component';
import { IpfsService } from './services/ipfs.service';
import { OrbitDbService } from './services/orbit-db.service';
import { StatusPageComponent } from './pages/status-page/status-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarService } from './services/toolbar.service';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UnhtmlPipe } from './pipes/unhtml.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { AddImageButtonComponent } from './components/add-image-button/add-image-button.component';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    IpfsStatusComponent,
    OrbitDbStatusComponent,
    ArticlesListComponent,
    SingleArticleComponent,
    CreateArticleComponent,
    ArticleListItemComponent,
    StatusPageComponent,
    ToolbarComponent,
    FooterComponent,
    AddImageButtonComponent,
    ImageLoaderComponent,
    UnhtmlPipe,
    SafeHtmlPipe,
    ImageLoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    MatSnackBarModule,
    NgxFileDropModule,
    MatMenuModule,
    FormsModule,
    QuillModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [IpfsService, OrbitDbService, ToolbarService, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private orbitDbService: OrbitDbService, private ipfsService: IpfsService) {
    this.ipfsService.init();
    this.orbitDbService.init();
  }
}
