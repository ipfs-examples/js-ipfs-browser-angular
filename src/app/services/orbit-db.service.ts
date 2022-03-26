import { Injectable } from '@angular/core';
import OrbitDb, { OrbitDB } from 'orbit-db';
import {
  BehaviorSubject,
  filter, Observable,
  Subject,
  switchMap,
  tap
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IpfsService } from './ipfs.service';

export interface OrbitDbInited {
  address: string;
  identity: string;
  own: boolean;
  instance: any;
}

export interface ArticleDTO {
  _id: string;
  thumbnail: string;
  createdAt: number;
  title: string;
  html: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrbitDbService {
  private orbitInstance: any; // TODO: no proper typings
  private orbitStore: any;
  private orbitInitedSubject = new BehaviorSubject<OrbitDbInited | null>(null);
  public orbitInited$ = this.orbitInitedSubject
    .asObservable()
    .pipe(filter((x) => !!x));
  private replicatedSubject = new Subject<string>();
  private replicated$ = this.replicatedSubject.asObservable();
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
        instance: this.orbitInstance
      });
    });
  }

  private setEvents(): void {
    this.orbitStore.events.on('ready', (dbname: string) => {
      console.log('ORBITDB: ready', dbname);
      this.replicatedSubject.next('');

    });

    this.orbitStore.events.on('write', (address: string, entry: any) => {
      console.log('ORBITDB: write', address, entry);
    });

    this.orbitStore.events.on('peer', (peer: any) => {
      console.log('ORBITDB: peer', peer);
    });

    this.orbitStore.events.on('replicated', (address: string) => {
      console.log('replicated', address);
      this.replicatedSubject.next(address);
    });

    this.orbitStore.events.on(
      'load.progress',
      (
        address: string,
        _hash: string,
        _entry: any,
        progress: string,
        total: string
      ) => {
        console.log('load.progress', progress, total);

      }
    );

    this.orbitStore.events.on('load', () => {
      console.log('ORBITDB: load')
      this.replicatedSubject.next('');
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
      environment.rootAddress,
      {
        create: true,
        sync: false,
      }
    );
    console.log('loaded store', this.orbitStore);
    this.setEvents();

    await this.orbitStore.load();
  }

  private async createStore() {
    const options = {
      create: true,
      sync: true,
      // Give write access to ourselves
      accessController: {
        write: [this.orbitInstance.identity.id],
      },
    };
    this.orbitStore = await this.orbitInstance!.docstore(
      environment.rootDirectory,
      options
    );
    this.setEvents();

    console.log(
      'created new database at address',
      this.orbitStore.address.toString()
    );
  }

  public getArticles$(skip = 0): Observable<ArticleDTO[]> {
    return this.orbitInited$.pipe(
      switchMap(async () => {
        const results = await this.orbitStore.get('');
        return results;
      }),
      tap((x) => console.log('articles', x))
    );
  }

  public getSingleArticle(id: string) {
    return this.orbitInited$.pipe(
      switchMap(async() => {
        console.log('getting id', id);
        const result = await this.orbitStore.get(id);
        console.log('got result', result);
        return result[0];
      })
    )
  }

  public async saveArticle(articleDto: ArticleDTO) {
    const entity = await this.orbitStore.put(articleDto, { pin: true });
    return entity;
  }
}
