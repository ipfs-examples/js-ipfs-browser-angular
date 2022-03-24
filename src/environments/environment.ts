// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rootDirectory: 'example-uncensorable-dapp',
  rootAddress: '/orbitdb/zdpuAt9FQL8DrzSsswYRWaSNEJqAzQnL8szTJYomRk2cFFKpF/example-uncensorable-dapp',
  IPFSConfigAddresses: {
    Gateway: 'http://127.0.0.1:8080',
    API: '/ip4/127.0.0.1/tcp/5001',
    Swarm: [
      '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
      '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
      '/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star',
      '/ip4/85.222.97.102/tcp/48389/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9',
      '/ip4/85.222.97.102/udp/48389/quic/p2p/12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9'
     ]
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
