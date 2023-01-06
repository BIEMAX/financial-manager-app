import { Injectable } from '@angular/core';

/**
 * Generic class that open a dialog to show user that an error ocurrered
 * (with more info than usual).
 * Maybe in some cases, show the solution to fix the error.
 */
@Injectable({
  providedIn: 'root'
})
export class GenericFunctions {

  /**
   * Check if is an mobile device
   * @returns True is mobile device
   */
  public isMobileDevice () {
    return screen.height <= 1080 && screen.width <= 768;
  }
}