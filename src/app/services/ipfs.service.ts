import { Injectable } from '@angular/core';

import { IPFS, create } from 'ipfs-core';
import * as IPFS_ROOT_TYPES from 'ipfs-core-types/src/root';
import { BehaviorSubject, filter, } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private _ipfsSource = new BehaviorSubject<null | IPFS>(null);
  public ipfs$ = this._ipfsSource
    .asObservable()
    .pipe(filter((x) => !!x)) as Observable<IPFS>;
  // private _createIPFSNodePromise: Promise<IPFS>;
  node: IPFS | null = null;

        node = await this._createIPFSNodePromise as IPFS;
        console.log('created node', node);
        this._ipfsSource.next(node);
      }

      return node;
    }

    return getter();
  }

  constructor() {
    console.log("Starting new node...")

    this._createIPFSNodePromise = create({
      start: true,
      repo: environment.rootDirectory,
      EXPERIMENTAL: {
        ipnsPubsub: true
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
            '/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star',
            '/ip4/85.222.97.102/tcp/48389/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9',
            '/ip4/85.222.97.102/udp/48389/quic/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9'
           ]
        },
        "Discovery": {
          "MDNS": {
            "Enabled": false,
            "Interval": 10
          },
          "webRTCStar": {
            "Enabled": true
          }
        },
        "Bootstrap": [
          "/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
          "/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6"
        ]
      },
    })
    console.log('IPFS Node', this.ipfs);
  }

  /**
   * @description Get the ID information about the current IPFS node
   * @return {Promise<IPFS_ROOT_TYPES.IDResult>}
   */
  async getId(): Promise<IPFS_ROOT_TYPES.IDResult> {
    const node = await this.ipfs;
    return await node.id();
  }

  /**
   * @description Get the version information about the current IPFS node
   * @return {Promise<IPFS_ROOT_TYPES.VersionResult>}
   */
  async getVersion(): Promise<IPFS_ROOT_TYPES.VersionResult> {
    const node = await this.ipfs;
    return await node.version();
  }

  /**
   * @description Get the status of the current IPFS node
   * @returns {Promise<boolean>}
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
      | ArrayBuffer
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
    return this.ipfs$.pipe(
      switchMap((ipfs) => {
        return from(ipfs.cat(path));
      }),
      first()
    );
  }

  private cat(ipfs: any, path: string) {
    return new Promise((resolve, reject) => {
      ipfs.cat(path, { buffer: true }, (err: any, stream: any) => {
        if (err) {
          reject(err);
        }
        let res = '';

        stream.on('data', function (chunk: any) {
          res += chunk.toString();
        });

        stream.on('error', function (err: any) {
          console.error(err);
          throw new Error(`Cannot read path ${ipfs}`);
        });

        stream.on('end', function () {
          console.log('Got:', res);
          resolve(res);
        });
      });
    });
  }
}
