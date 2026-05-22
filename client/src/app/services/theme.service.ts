import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkModeKey = 'darkMode';

  constructor() {
    this.initTheme();
  }

  initTheme() {
    const saved = localStorage.getItem(this.darkModeKey);

    if (saved === 'true') {
      document.body.classList.add('dark-theme');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }

  toggleTheme() {

    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem(this.darkModeKey, 'false');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem(this.darkModeKey, 'true');
    }
  }
}