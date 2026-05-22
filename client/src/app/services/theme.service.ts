import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = false;

  constructor() {

    const savedTheme =
      localStorage.getItem('theme');

    this.darkMode =
      savedTheme === 'dark';

    this.applyTheme();
  }

  // =========================
  // TOGGLE THEME
  // =========================

  toggleTheme(): void {

    this.darkMode = !this.darkMode;

    localStorage.setItem(
      'theme',
      this.darkMode
        ? 'dark'
        : 'light'
    );

    this.applyTheme();
  }

  // =========================
  // APPLY THEME
  // =========================

  applyTheme(): void {

    if (this.darkMode) {

      document.body.classList.add('dark-theme');

    } else {

      document.body.classList.remove('dark-theme');
    }
  }

  // =========================
  // CHECK MODE
  // =========================

  isDarkMode(): boolean {

    return this.darkMode;
  }
}