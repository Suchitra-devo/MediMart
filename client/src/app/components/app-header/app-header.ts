import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  NavigationEnd
} from '@angular/router';

import { ThemeService }
from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './app-header.html',

  styleUrls: ['./app-header.css']
})
export class AppHeaderComponent {

  currentUrl = '';

  darkMode = false;

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        this.currentUrl = event.url;
      }
    });

    // INITIAL THEME STATE
    this.darkMode =
      this.themeService.isDarkMode();
  }

  // =========================
  // PAGE CHECKS
  // =========================

  isLandingPage(): boolean {

    return this.currentUrl === '/';
  }

  isAuthPage(): boolean {

    return this.currentUrl === '/login'
      || this.currentUrl === '/register';
  }

  // Hide navbar on auth pages
  isHiddenPage(): boolean {

    return this.isAuthPage();
  }

  // =========================
  // NAVIGATION
  // =========================

  goToLogin(): void {

    this.router.navigate(['/login']);
  }

  // =========================
  // LOGOUT
  // =========================

  logout(): void {

    localStorage.clear();

    this.darkMode = false;

    this.router.navigate(['/login']);
  }

  // =========================
  // THEME TOGGLE
  // =========================

  toggleTheme(): void {

    this.themeService.toggleTheme();

    this.darkMode =
      this.themeService.isDarkMode();
  }

  isDarkMode(): boolean {

    return this.darkMode;
  }
}