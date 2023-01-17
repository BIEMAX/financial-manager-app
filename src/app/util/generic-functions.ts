import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Generic class that contains generic functions (didn't depends from other dependencies),
 * for example, validate if is a mobile device and show notifications on the screen.
 */
@Injectable({
  providedIn: 'root'
})
export class GenericFunctions {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Check if is an mobile device
   * @returns True is mobile device
   */
  public isMobileDevice () {
    return screen.height <= 1080 && screen.width <= 768;
  }

  /**
   * Show a notification in the main page
   * @param message Message to display
   * @param action Origin event (default '')
   * @param duration Integer containing the value to animation time (default 2ms)
   */
  public showNotification (message: string, action: string = '', duration = 2000) {
    this.snackBar.open(message, action, { duration: duration })
  }
}