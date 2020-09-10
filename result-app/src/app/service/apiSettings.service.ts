import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSettingsService {

  private _ip: string = window.location.hostname;
  private _apiString = ':5000';
  private _timeout = 3000;

  constructor() {
    if (!environment.production) {
      const ip = sessionStorage.getItem('activeServerIp');
      this._ip = ip ? ip : window.location.hostname;
    }
  }

  public setIp(ip: string): void {
    this._ip = ip;
    sessionStorage.setItem('activeServerIp', ip);
  }

  public getApiUrl(): string {
    return `http://${this._ip}${this._apiString}`;
  }

  public getTimeout(): number {
    return this._timeout;
  }
}
