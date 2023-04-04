import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'alpilean',
  templateUrl: './alpilean.component.html',
  styleUrls: ['./alpilean.component.css']
})
export class AlpileanComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Alpilean";
  private affiliateLink: string = 'https://7d2fdbt4-39r7ke2mcr8kwvybp.hop.clickbank.net/?tid=CB032023';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
