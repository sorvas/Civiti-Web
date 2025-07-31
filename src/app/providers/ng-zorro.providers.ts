import { Provider } from '@angular/core';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { NZ_I18N, ro_RO } from 'ng-zorro-antd/i18n';

export const ngZorroConfig = provideNzConfig({
  theme: {
    primaryColor: '#FCA311',
    infoColor: '#14213D',
    successColor: '#28A745',
    warningColor: '#FCA311',
    errorColor: '#DC3545',
  },
  message: {
    nzTop: 24,
    nzDuration: 3000,
    nzMaxStack: 3,
  },
  notification: {
    nzTop: '24px',
    nzPlacement: 'topRight',
  }
});

export const ngZorroIcons = provideNzIcons([]);

export const ngZorroI18n: Provider = { provide: NZ_I18N, useValue: ro_RO };