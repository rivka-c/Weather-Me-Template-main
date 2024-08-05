import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  toggleTheme() {
    const currentTheme = this.isDarkTheme.value;
    this.isDarkTheme.next(!currentTheme);
    if (!currentTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  getTheme() {
    return this.isDarkTheme.value ? 'dark-theme' : 'light-theme';
  }
}