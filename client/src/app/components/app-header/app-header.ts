import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Router,
  NavigationEnd
}
from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './app-header.html',

  styleUrls: ['./app-header.css']
})
export class AppHeaderComponent {

  currentUrl = '';

  constructor(
    private router: Router
  ) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.currentUrl = event.url;
      }
    });
  }

  // =====================
  // LANDING PAGE CHECK
  // =====================

  isLandingPage(): boolean {

    return this.currentUrl === '/';
  }

  // =====================
  // LOGIN PAGE CHECK
  // =====================

  isAuthPage(): boolean {

    return this.currentUrl === '/login'
      || this.currentUrl === '/register';
  }

  // =====================
  // LOGIN NAVIGATION
  // =====================

  goToLogin(): void {

    this.router.navigate(['/login']);
  }

  // =====================
  // LOGOUT
  // =====================

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/']);
  }
}