import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pro-fr',
  templateUrl: './pro-fr.component.html',
  styleUrls: ['./pro-fr.component.css']
})
export class ProdentimFrComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "ProDentim";
  public showLastChanceToBuy: boolean = true;
  public offerNumber: number = 40;
  private affiliateLink: string = 'https://32f25m3zwrrt0m7mwnl3sql69e.hop.clickbank.net/?tid=CB120423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
