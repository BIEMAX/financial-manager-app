import { Component, OnInit } from '@angular/core';
import { environment, ui } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

import ImageAff from 'src/app/models/image.model'

@Component({
  selector: 'synogut',
  templateUrl: './synogut.component.html',
  styleUrls: ['./synogut.component.css']
})
export class SynogutComponent implements OnInit {

  public uiColor = ui.color;
  public listImages: Array<ImageAff>;
  public productName: string = "Synogut";
  private affiliateLink: string = 'https://thesynogut.com/text.php?aff_id=57710&subid=gus';

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
