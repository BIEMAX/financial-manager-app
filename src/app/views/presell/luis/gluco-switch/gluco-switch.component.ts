import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'gluco-switch',
  templateUrl: './gluco-switch.component.html',
  styleUrls: ['./gluco-switch.component.css']
})
export class GlucoswiluiComponent implements OnInit {

  public uiColor = ui.color;
  public productName: string = "Gluco Switch";
  private affiliateLink: string = 'https://glucoswitch.co/?aff_id=550&subid=Gus070423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
