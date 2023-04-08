import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'glucofort',
  templateUrl: './glucofort.component.html',
  styleUrls: ['./glucofort.component.css']
})
export class GlucofortluiComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Glucofort";
  private affiliateLink: string = 'https://glucofort.com/indexb.php?aff_id=512450&subid=Gus070423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
