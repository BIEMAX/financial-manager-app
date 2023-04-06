import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'alpi-luis',
  templateUrl: './alpi-luis.component.html',
  styleUrls: ['./alpi-luis.component.css']
})
export class AlpiluisComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Alpilean";
  private affiliateLink: string = 'https://a1c549yflzcquxc6ogqek9wzdq.hop.clickbank.net/?tid=gus060423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
