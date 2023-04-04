import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

import ImageAff from 'src/app/models/image.model'

@Component({
  selector: 'prostadine',
  templateUrl: './prostadine.component.html',
  styleUrls: ['./prostadine.component.css']
})
export class ProstadineFrComponent implements OnInit {

  public uiColor = ui.color;
  public listImages: Array<ImageAff>;
  public productName: string = "Prostadine";
  private affiliateLink: string = 'https://theprostadine.com/text.php?aff_id=194170';

  constructor(private titleService: Title) { }

  ngOnInit (): void {
    this.titleService.setTitle(this.productName);
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
