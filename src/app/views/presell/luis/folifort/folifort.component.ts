import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'folifort',
  templateUrl: './folifort.component.html',
  styleUrls: ['./folifort.component.css']
})
export class FolifortluiComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Folifort";
  private affiliateLink: string = 'https://folifort.com/indexb.php?aff_id=27898&subid=Gus070423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
