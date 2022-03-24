import { Injectable } from '@angular/core';
import { filter, from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrbitDbService } from './orbit-db.service';

export interface ArticleEntity {
  _id: string;
  thumbnail: string;
  createdAt: Date;
  title: string;
  html: string;
}

export interface ArticleCreationAttributes {
  thumbnail: string;
  title: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService implements AbstractEntity {
  static ENTITY_NAME = 'articles';
  private orbitStore$ = this.orbitDbService.orbitInited$.pipe(
    filter((x) => !!x),
    switchMap((orbitInited: any) => {
      const config = environment.stores.find(x => x.name === ArticleService.ENTITY_NAME);
      if (!config) {
        throw('Article environment undefined')
      }
      return from(
        orbitInited!.instance.docstore(config.rootAddress, {
          create: true,
          sync: true,
        })
      );
    }),
    switchMap((orbitStore: any) => {
      //TODO: unknown type
      return from(orbitStore.load().then(() => orbitStore));
    })
  );

  constructor(private orbitDbService: OrbitDbService) {}

  // TOSO: skip
  public getArticles$(skip = 0): Observable<ArticleEntity[]> {
    return this.orbitStore$.pipe(
      switchMap((orbitStore: any) => {
        return from(orbitStore.get('')) as Observable<ArticleEntity[]>;
      })
    );
  }
}
