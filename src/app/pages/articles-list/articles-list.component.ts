import { Component, OnInit } from '@angular/core';
import { ArticleDTO, OrbitDbService } from 'src/app/services/orbit-db.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  own = true;
  articles = [{
    title: 'Hello decentralized world',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus arcu, iaculis vitae tortor vel, iaculis euismod est. Praesent hendrerit erat fermentum, faucibus ante et, tempor nibh. Maecenas vel ornare arcu. Aliquam nunc nibh, eleifend at posuere quis, porta dapibus ante. Nam fringilla sem at convallis porttitor. Proin semper aliquet aliquam. Vivamus dui leo, euismod sit amet tellus sit amet, dapibus volutpat enim. Donec gravida nulla id ipsum gravida ornare. Mauris a tristique nulla. Morbi mollis mollis odio, nec placerat sem. Etiam blandit nunc ac nunc maximus, eu efficitur mi semper. Nullam elementum magna mi, et lobortis elit sollicitudin vel.
    `,
    thumbnail: '623767fdc097985bfdf79bea.jpeg'
  }, {
    title: 'Help fight censorship',
    description: 'join our Discord and Telegram channels',
    thumbnail: 'avatar-2d7e7cd9ea5721160b7dbcbe6d95d682.jpg'
  }];
  loading = true;
  constructor(public orbitDb: OrbitDbService, private toolbarService: ToolbarService) { }

  async ngOnInit(): Promise<void> {
    this.orbitDb.getArticles$().subscribe((articles: ArticleDTO[]) => {
      console.log('got articles', articles);
      this.articles = articles;
    });
    this.toolbarService.setButtons({ buttons: [] });
    this.toolbarService.setTitle('List of articles');
    this.toolbarService.setBackButton(false);
  }

}
