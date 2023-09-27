import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    let element = document.querySelector('nav') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('nav-scroll');
    } else {
      element.classList.remove('nav-scroll');
    }
  }
}