import { Injectable } from '@angular/core';

import { IPFS, create } from 'ipfs-core';
import { MFSEntry } from 'ipfs-core-types/src/files';
import * as IPFS_ROOT_TYPES from 'ipfs-core-types/src/root';
import {
  BehaviorSubject,
  filter,
  first,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private _ipfsSource = new BehaviorSubject<null | IPFS>(null);
  public ipfs$ = this._ipfsSource
    .asObservable()
    .pipe(filter((x) => !!x)) as Observable<IPFS>;
  // private _createIPFSNodePromise: Promise<IPFS>;
  node: IPFS | null = null;
  // private get ipfs() {
  //   const getter = async () => {
  //     let node = this._ipfsSource.getValue();
  //     if (node == null) {
  //       console.log("Waiting node creation...")

  //       node = await this._createIPFSNodePromise as IPFS;
  //       console.log('created node', node);

  //       this._ipfsSource.next(node);
  //     }

  //     return node;
  //   }

  //   return getter();
  // }

  constructor() {}

  async init(): Promise<void> {
    console.log('Starting new node...');

    if (this.node == null) {
      console.log('Waiting node creation...');

      this.node = (await create({
        start: true,
        repo: environment.rootDirectory,
        EXPERIMENTAL: {
          ipnsPubsub: true,
        },
        config: {
          Addresses: environment.IPFSConfigAddresses,
          Discovery: {
            MDNS: {
              Enabled: false,
              Interval: 10,
            },
            webRTCStar: {
              Enabled: true,
            },
          },
          Bootstrap: [
            '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
            '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
          ],
        },
      })) as IPFS;
      console.log(this.node);
      // await this.syncDirectories();
      this._ipfsSource.next(this.node);
    }
  }



  /**
   * @description Get the ID information about the current IPFS node
   * @return {Promise<IPFS_ROOT_TYPES.IDResult>}
   */
  getIPFSData(): Observable<IPFS_ROOT_TYPES.IDResult> {
    return this.ipfs$.pipe(switchMap((ipfs) => from(ipfs!.id())));
  }

  /**
   * @description Get the version information about the current IPFS node
   * @return {Observable<IPFS_ROOT_TYPES.VersionResult>}
   */
  getVersion(): Observable<IPFS_ROOT_TYPES.VersionResult> {
    return this.ipfs$.pipe(switchMap((ipfs) => from(ipfs!.version())));
  }

  /**
   * @description Get the status of the current IPFS node
   * @returns {Observable<boolean>}
   */
  getStatus(): Observable<boolean> {
    return this.ipfs$.pipe(map((ipfs) => ipfs!.isOnline()));
  }

  uploadFile(
    fileContent:
      | Uint8Array
      | Blob
      | Iterable<Uint8Array>
      | Iterable<number>
      | AsyncIterable<Uint8Array>
      | ReadableStream<Uint8Array>
      | String
  ): Observable<any> {
    return this.ipfs$.pipe(
      switchMap(async (ipfs) => {
        console.log('fileContent', fileContent);
        try {
          const result = await (ipfs as any).add(fileContent);
          console.log(result);
          return result;
        } catch (e) {
          console.error(e);
        }
        
      }),
      tap((file) => console.log('file saved', file))
    );
  }

  getFile(path: string) {
    return this.ipfs$.pipe(switchMap((ipfs) => {

      return from(ipfs.get(path))
    }),first());
  } 
}
