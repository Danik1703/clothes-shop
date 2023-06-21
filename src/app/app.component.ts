import { Component } from '@angular/core';

@Component({
  selector:  'plugin-example', // 'app-root',
  template:  '<router-outlet></router-outlet>', // <-- також замінюємо стандартний вміст
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clothes-shop';
}
