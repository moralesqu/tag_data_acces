import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TranslateAppService {

  constructor(public translateService: TranslateService,
              private toastrService: ToastrService) {
    const lng = localStorage.getItem('language');
    if (lng === 'eng' || lng === 'pl' || lng === 'cz') {
      this.translateService.setDefaultLang(lng);
      this.translateService.use(lng);
    } else {
      this.translateService.setDefaultLang('pl');
      this.translateService.use('pl');
    }
  }

  public setEnglish() {
    this.translateService.use('eng');
    localStorage.setItem('language', 'eng');
  }

  public setPolish() {
    this.translateService.use('pl');
    localStorage.setItem('language', 'pl');
  }

  public setCzech() {
    this.translateService.use('cz');
    localStorage.setItem('language', 'cz');
  }

  public toastrSuccess(message: string, title?: string) {
    if (title) {
      this.toastrService.success(this.translateService.instant(message), this.translateService.instant(title))
    } else {
      this.toastrService.success(this.translateService.instant(message))
    }
  }

  public toastrError(message: string, title?: string) {
    if (title) {
      this.toastrService.error(this.translateService.instant(message), this.translateService.instant(title), {
        timeOut: 10000
      })
    } else {
      this.toastrService.error(this.translateService.instant(message), '', {
        timeOut: 10000
      })
    }
  }

  public toastrErrorResponse(message: string, err: any) {
    let text = '';
    if (err && err.error && err.error.message) {
      text = err.error.message
    } else {
      text = this.translateService.instant('USEFUL.CONNECTION_PROBLEM');
    }
    this.toastrService.error(`${this.translateService.instant(message)}\n ${text}`, this.translateService.instant('USEFUL.ERROR'), {
      timeOut: 10000
    })

  }

  public toastrInfo(message: string, title?: string) {
    if (title) {
      this.toastrService.info(this.translateService.instant(message), this.translateService.instant(title))
    } else {
      this.toastrService.info(this.translateService.instant(message), '', {
        closeButton: true,
        timeOut: 10000,
        extendedTimeOut: 5000
      })
    }
  }
}
