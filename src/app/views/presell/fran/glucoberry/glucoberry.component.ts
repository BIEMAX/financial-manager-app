import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'glucoberry',
  templateUrl: './glucoberry.component.html',
  styleUrls: ['./glucoberry.component.css']
})
export class GlucoberryComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Glucoberry";
  private affiliateLink: string = 'https://bloodsugarberry.net/cb/?aff_id=8386';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
