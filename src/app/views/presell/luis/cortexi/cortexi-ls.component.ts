import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'cortexi-ls',
  templateUrl: './cortexi-ls.component.html',
  styleUrls: ['./cortexi-ls.component.css']
})
export class CortexiLsComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Cortexi";
  public showLastChanceToBuy: boolean = true;
  private affiliateLink: string = 'https://fe65aq-1-elq7xearlv24dck3z.hop.clickbank.net/?tid=CB130423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
