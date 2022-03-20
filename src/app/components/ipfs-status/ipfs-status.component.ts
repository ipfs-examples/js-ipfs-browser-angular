import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../../services/ipfs.service';

@Component({
  selector: 'app-ipfs-status',
  templateUrl: './ipfs-status.component.html',
  styleUrls: ['./ipfs-status.component.css']
})
export class IpfsStatusComponent implements OnInit {
  id: string | null = null;
  version: string | null  = null;
  status: string | null  = null;
  constructor(private IPFSService: IpfsService) { }

  async ngOnInit(): Promise<void> {
    const id = await this.IPFSService.getId();
    this.id = id.id;

    const version = await this.IPFSService.getVersion();
    this.version = version.version

    const status = await this.IPFSService.getStatus();
    this.status = status ? 'Online' : 'Offline'
  }

}
