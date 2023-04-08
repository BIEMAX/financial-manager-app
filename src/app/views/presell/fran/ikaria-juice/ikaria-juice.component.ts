import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ikaria-juice',
  templateUrl: './ikaria-juice.component.html',
  styleUrls: ['./ikaria-juice.component.css']
})
export class IkariaJuiceComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Ikaria Lean Belly Juice";
  private affiliateLink: string = 'https://1a6ab1tcyvtgtcnbd557i76o86.hop.clickbank.net/?tid=CB080423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
