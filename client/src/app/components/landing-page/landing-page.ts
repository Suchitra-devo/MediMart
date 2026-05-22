import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Router }
from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPageComponent
implements OnInit, OnDestroy {

  storeOpen = true;

  openingTime = '8:00 AM';

  currentDate: Date = new Date();

  greeting = '';

  private timer: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.updateGreeting();
    this.loadStoreStatus();

    this.timer = setInterval(() => {

      this.currentDate = new Date();
      this.updateGreeting();

      // LIVE SYNC STORE STATUS
      this.loadStoreStatus();

    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  // =========================
  // GREETING
  // =========================
  updateGreeting() {

    const hour = this.currentDate.getHours();

    if (hour < 12) {
      this.greeting = 'Good Morning ☀️';
    }
    else if (hour < 18) {
      this.greeting = 'Good Afternoon 🌤️';
    }
    else {
      this.greeting = 'Good Evening 🌙';
    }
  }

  // =========================
  // STORE STATUS FIXED
  // =========================
  loadStoreStatus() {

    const status = localStorage.getItem('storeOpen');

    this.storeOpen = status === null
      ? true
      : status === 'true';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}