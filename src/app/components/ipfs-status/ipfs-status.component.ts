import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { IpfsService } from '../../services/ipfs.service';

@Component({
  selector: 'app-ipfs-status',
  templateUrl: './ipfs-status.component.html',
  styleUrls: ['./ipfs-status.component.css']
})
export class IpfsStatusComponent implements OnInit {
  loading = true;
  ipfsData = '';
  constructor(private IPFSService: IpfsService, private toolbarService: ToolbarService) { }
  ngOnInit(): void {
    this.IPFSService.getIPFSData().subscribe((ipfsData) => {
      this.ipfsData = JSON.stringify(ipfsData);
      this.loading = false;
    });
    this.toolbarService.setTitle('IPFS Status');
    this.toolbarService.backButton = true;
  }

}
