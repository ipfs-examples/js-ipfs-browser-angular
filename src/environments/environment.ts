// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootDirectory: 'example-uncensorable-dapp',
  rootAddress: '/orbitdb/zdpuAtV25cat7HWgTviWKzEKgScuVPLBAnTQdfBNBMf5xijxT/example-uncensorable-dapp',
  IPFSConfig: {
    repo: '/orbitdb/dpress',
    start: true,
    EXPERIMENTAL: {
      ipnsPubsub: true,
    },
    relay: {
      enabled: true,
    },
    offline: false,
    repoAutoMigrate: true,
    config: {
      API: {
        HTTPHeaders: {
          'Access-Control-Allow-Origin': ['*'],
        },
      },
      Addresses: {
        Gateway: 'http://10.0.0.2:8080',
        API: '/ip4/10.0.0.2/tcp/5001',
        Swarm: [
          '/ip4/10.0.0.2/tcp/4001',
          '/ip4/10.0.0.2/udp/4001/quic',
          '/ip4/85.222.97.102/tcp/59115',
          '/ip4/85.222.97.102/udp/57675/quic',
          '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
          '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
          '/ip4/10.0.0.2/tcp/48389/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9',
          '/ip4/10.0.0.2/udp/48389/quic/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9',
        ],
      },
      Discovery: {
        MDNS: {
          Enabled: true,
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
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
