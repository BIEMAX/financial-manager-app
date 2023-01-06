import { Component, OnInit } from '@angular/core';
import { GenericFunctions } from 'src/app/util/generic-functions';

@Component({
  selector: 'app-footer',
  template: ``,
  styles: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public isMobileDevice: Boolean = false;

  constructor(
    private genericFunctions: GenericFunctions
  ) { }

  ngOnInit (): void {
    this.isMobileDevice = this.genericFunctions.isMobileDevice();
  }

}
