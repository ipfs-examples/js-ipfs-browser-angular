import { Injectable } from '@angular/core';
import OrbitDB from 'orbit-db';
import OrbitDb from 'orbit-db';
import DocumentStore from 'orbit-db-docstore';
import { BehaviorSubject, filter, from, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpfsService } from './ipfs.service';

export interface OrbitDbInited {
  address: string;
  identity: string;
  own: boolean;
}

export interface ArticleDTO {
  title: string;
  description: string;
  createdAt: string;
  _id: string;
  thumbnail: string;
  video: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrbitDbService {
  private orbitInstance: any;
  private orbitStore: any;
  private orbitInitedSubject = new BehaviorSubject<OrbitDbInited | null>(null);
  public orbitInited$ = this.orbitInitedSubject.asObservable();
  constructor(private ipfsService: IpfsService) {}

  init() {
    this.ipfsService.ipfs$.subscribe(async (ipfsInstance) => {
      this.orbitInstance = await OrbitDb.createInstance(ipfsInstance);
      // if dbAddress exists - load it and check if it's own
      // if not - create new db and mark editable: true
      if (environment.rootAddress && environment.rootAddress.length > 0) {
        // load store
        await this.loadStore();
      } else {
        // create store
        console.log('creating database');
        await this.createStore();
      }
      this.orbitInitedSubject.next({
        address: this.orbitStore.address.toString(),
        identity: this.orbitInstance.identity.publicKey,
        own: this.isOwnStore(),
      });
    });
  }

  // async testPut() {
  //   const entity = await this.orbitStore.put(
  //     { _id: 'test2', description: 'testput' },
  //     { pin: true }
  //   );
  //   console.log('saved entity', entity);
  //   const findAll = await this.orbitStore.get('');
  //   console.log('find all result', findAll);
  // }

  private isOwnStore() {
    return this.orbitStore.access.write[0] === this.orbitInstance.identity.id;
  }

  private async loadStore() {
    // load store from environment
    this.orbitStore = await this.orbitInstance!.docstore(
      environment.rootAddress
    );
    await this.orbitStore.load();

  }

  private async createStore() {
    const options = {
      // Give write access to ourselves
      accessController: {
        write: [this.orbitInstance.identity.id],
      },
    };
    this.orbitStore = await this.orbitInstance!.docstore(
      environment.rootDirectory,
      options
    );
    console.log(
      'created new database at address',
      this.orbitStore.address.toString()
    );

  }

  public getArticles$(skip = 0): Observable<ArticleDTO[]> {
    return this.orbitInited$.pipe(
      filter((x: OrbitDbInited | null) => !!x),
      switchMap(async() => {
        const results = await this.orbitStore.get('');
        return results;
      }),
      tap(x => console.log('articles', x))
    );
  }

  private async saveArticle(articleDto: ArticleDTO) {
    const entity = await this.orbitStore.put(articleDto, { pin: true });
    return entity;
  }
}
