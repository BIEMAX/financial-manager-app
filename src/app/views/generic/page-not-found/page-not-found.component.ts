import { Component, OnInit } from '@angular/core';
import { ui } from 'src/environments/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  /**
     * Define default color on UI (User Interface)
     */
  public uiColor: string = ui.color;

  constructor() { }

  ngOnInit (): void {
  }

}
