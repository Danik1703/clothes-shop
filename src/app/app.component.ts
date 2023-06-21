import { Component } from '@angular/core';

@Component({
  selector:  'clothes-shop', // 'app-root',
  template:  '<router-outlet></router-outlet>', // <-- також замінюємо стандартний вміст
})
export class AppComponent {
  title = 'clothes-shop';
}
