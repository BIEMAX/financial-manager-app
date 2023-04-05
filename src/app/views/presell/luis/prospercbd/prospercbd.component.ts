import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

import ImageAff from 'src/app/models/image.model'

@Component({
  selector: 'prosperCbd',
  templateUrl: './prosperCbd.component.html',
  styleUrls: ['./prosperCbd.component.css']
})
export class ProsperComponent implements OnInit {

  public uiColor = ui.color;
  public listImages: Array<ImageAff>;
  public productName: string = "Joint Restore Gummies";
  private affiliateLink: string = 'https://433b5d2po85lqw5itctr4aup7u.hop.clickbank.net/?tid=fast_050423';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
    console.log('dionei');
  }

  createImagesStructure () {
    this.listImages = [
      new ImageAff(
        '/assets/presell-images/Prostadine.png',
        '1',
        true
      ),
    ]
  }

  onClick () {
    window.location.href = this.affiliateLink;
  }
}
