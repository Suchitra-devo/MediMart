import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private darkMode = false;

  constructor() {

    const savedTheme =
      localStorage.getItem('darkMode');

    this.darkMode =
      savedTheme === 'true';

    this.applyTheme();
  }

  // =========================
  // TOGGLE THEME
  // =========================
  toggleTheme(): void {

    this.darkMode = !this.darkMode;

    localStorage.setItem(
      'darkMode',
      String(this.darkMode)
    );

    this.applyTheme();
  }

  // =========================
  // APPLY THEME
  // =========================
  applyTheme(): void {

    if (this.darkMode) {

      document.body.classList.add(
        'dark-theme'
      );

    } else {

      document.body.classList.remove(
        'dark-theme'
      );
    }
  }

  // =========================
  // GET STATUS
  // =========================
  isDarkMode(): boolean {

    return this.darkMode;
  }
}