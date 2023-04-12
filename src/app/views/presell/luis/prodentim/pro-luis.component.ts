import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pro-luis',
  templateUrl: './pro-luis.component.html',
  styleUrls: ['./pro-luis.component.css']
})
export class ProdentimLuisComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "ProDentim";
  public showLastChanceToBuy: boolean = true;
  public offerNumber: number = 40;
  private affiliateLink: string = 'https://theprodentim.com/text.php?aff_id=132282&subid=Gus120423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
