<p align="center">
  <a href="https://js.ipfs.io" title="JS IPFS">
    <img src="https://ipfs.io/ipfs/Qme6KJdKcp85TYbLxuLV7oQzMiLremD7HMoXLZEmgo6Rnh/js-ipfs-sticker.png" alt="IPFS in JavaScript logo" width="244" />
  </a>
</p>

<h3 align="center"><b>dPress</b></h3>
<h4>Censorship-resistant blog platform</h4>


## PREREQUISITES

- node.js v16
- IPFS Desktop/CLI (https://github.com/ipfs/ipfs-desktop/releases)


## DEVELOPMENT

Let's try to run IPFS network on LAN network

we need to lookup IP address of our PC (let's say our main PC has local IP 10.0.0.2, and second testing device has IP 10.0.0.3)
- after installing node and IPFS open IPFS's config file (~/<username>/.ipfs/config on Linux, or C:\Users\<username>\.ipfs\config on Windows)
- put following config
```
{
  "API": {
    "HTTPHeaders": {}
  },
  "Addresses": {
    "API": "/ip4/10.0.0.2/tcp/5001",
    "Announce": [],
    "AppendAnnounce": null,
    "Gateway": "/ip4/10.0.0.2/tcp/8080",
    "NoAnnounce": [],
    "Swarm": [
      "/ip4/0.0.0.0/tcp/4001",
      "/ip6/::/tcp/4001",
      "/ip4/0.0.0.0/udp/4001/quic",
      "/ip6/::/udp/4001/quic"
    ]
  },
  "AutoNAT": {},
  "Bootstrap": [
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
    "/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
  ],
  "DNS": {
    "Resolvers": {}
  },
  "Datastore": {
    "BloomFilterSize": 0,
    "GCPeriod": "1h",
    "HashOnRead": false,
    "Spec": {
      "mounts": [
        {
          "child": {
            "path": "blocks",
            "shardFunc": "/repo/flatfs/shard/v1/next-to-last/2",
            "sync": true,
            "type": "flatfs"
          },
          "mountpoint": "/blocks",
          "prefix": "flatfs.datastore",
          "type": "measure"
        },
        {
          "child": {
            "compression": "none",
            "path": "datastore",
            "type": "levelds"
          },
          "mountpoint": "/",
          "prefix": "leveldb.datastore",
          "type": "measure"
        }
      ],
      "type": "mount"
    },
    "StorageGCWatermark": 90,
    "StorageMax": "10GB"
  },
  "Discovery": {
    "MDNS": {
      "Enabled": true,
      "Interval": 10
    }
  },
  "Experimental": {
    "AcceleratedDHTClient": false,
    "FilestoreEnabled": false,
    "GraphsyncEnabled": false,
    "Libp2pStreamMounting": false,
    "P2pHttpProxy": false,
    "StrategicProviding": false,
    "UrlstoreEnabled": false
  },
  "Gateway": {
    "APICommands": [],
    "HTTPHeaders": {
      "Access-Control-Allow-Headers": [
        "X-Requested-With",
        "Range",
        "User-Agent"
      ],
      "Access-Control-Allow-Methods": [
        "GET"
      ],
      "Access-Control-Allow-Origin": [
        "*"
      ]
    },
    "NoDNSLink": false,
    "NoFetch": false,
    "PathPrefixes": [],
    "PublicGateways": null,
    "RootRedirect": "",
    "Writable": false
  },
  "Identity": {
    "PeerID": "12D3KooWHHcwhVgQmnHvCgGAkRxRzUyNnr7g3ixNErUBeVJghGc9",
    "PrivKey": "CAESQFGrvT1ZiA24xlMxSDMWzzJ4GFAb9+ZQ0Y7c9W/chJAJbv0yUgMnBDnMf+uYX2WRYmCIT3g82LpTk/a+1jP+J+I="
  },
  "Internal": {},
  "Ipns": {
    "RecordLifetime": "",
    "RepublishPeriod": "",
    "ResolveCacheSize": 128
  },
  "Migration": {
    "DownloadSources": [],
    "Keep": ""
  },
  "Mounts": {
    "FuseAllowOther": false,
    "IPFS": "/ipfs",
    "IPNS": "/ipns"
  },
  "Peering": {
    "Peers": null
  },
  "Pinning": {
    "RemoteServices": {}
  },
  "Plugins": {
    "Plugins": null
  },
  "Provider": {
    "Strategy": ""
  },
  "Pubsub": {
    "DisableSigning": false,
    "Router": ""
  },
  "Reprovider": {
    "Interval": "12h",
    "Strategy": "all"
  },
  "Routing": {
    "Type": "dht"
  },
  "Swarm": {
    "AddrFilters": null,
    "ConnMgr": {
      "GracePeriod": "300s",
      "HighWater": 300,
      "LowWater": 50,
      "Type": "basic"
    },
    "DisableBandwidthMetrics": false,
    "DisableNatPortMap": false,
    "RelayClient": {},
    "RelayService": {},
    "Transports": {
      "Multiplexers": {},
      "Network": {},
      "Security": {}
    }
  }
}
```

where 10.0.0.2 is IP of your IPFS server

let's configure frontend now

- install Angular CLI
```
npm install -g @angular/cli
```
- clone project
```
git@github.com:ipfs-examples/js-ipfs-browser-angular.git
```

- open src/environment.ts file

- replace all 10.0.0.2 with address of your IPFS server
- remove "rootAdddress" string (make '' empty)

- `npm install`
- `npm start -- --host=10.0.0.2`

after compilation app will available at 10.0.0.2:4200

after first visit your Identity keys will be created and stored by the browser
also OrbitDb database will be created
go to "Debug info" page and copy your newly created address to "rootAddress" value in src/environment.ts

app will check the ownership of database and allow you to publish new articles

Articles will be pinned by your IPFS node. After visiting website from other (10.0.0.3) device your articles should be loaded, but without permissions to add new articles.

Work in progress...
