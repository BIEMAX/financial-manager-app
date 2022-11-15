import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class Encrypt {

  private encryptSecretKey: string = environment.apiSecret;

  constructor() { }

  /**
   * Function to encrypt a data into string
   */
  public encrypt = (data: any) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Function to decrypt a data to string
   */
  public decrypt = (data: any) => {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

}