import { TestBed } from '@angular/core/testing';

import { ApisettingsService } from 'src/app/service/apiSettings.service';

describe('APISettingsServiceService', () => {
  let service: ApisettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApisettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
