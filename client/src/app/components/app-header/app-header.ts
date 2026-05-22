import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

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

    this.darkMode = this.themeService.isDarkMode();
  }

  isAuthPage(): boolean {
    return this.currentUrl === '/login' || this.currentUrl === '/register';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.darkMode = this.themeService.isDarkMode();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}