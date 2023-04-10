import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cortexi',
  templateUrl: './cortexi.component.html',
  styleUrls: ['./cortexi.component.css']
})
export class CortexiComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Cortexi";
  private affiliateLink: string = 'https://3c7ac5vazwpen8u11b67-fbsdt.hop.clickbank.net/?tid=CB09042023';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
