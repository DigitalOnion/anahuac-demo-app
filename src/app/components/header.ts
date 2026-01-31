import { Component, inject } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { appSignalStore } from '../data/signal-store';
import { TickerDropdown } from './ticker-dropdown';

@Component({
  selector: 'app-header',
  imports: [MatAnchor, RouterLink, MatButton, TickerDropdown],
  template: `
    <header class="flex flex-row max-w-[1200px] mx-auto w-full bg-transparent text-black p-4">
      <div class="flex flex-row w-full">
        <div class="bg-orange-500 p-4 rounded-lg">
          <img
            src="images/anahuac-de-Queretaro.png"
            alt="Univesidad Anáhuac de Querétaro"
            class="h-28"
          />
        </div>
        <div class="flex flex-col ml-10">
          <h1 class="text-3xl font-bold">API Demo Application</h1>
          <p>por: Luis Virueña</p>
        </div>
      </div>

      <div class="flex flex-col justify-start space-between" style="width: 100%;">
        <div class="flex flex-row justify-end">
          @if (this.store.verifyUserLogin().isAuthenticated) {
            <button matButton="filled" class="custom-anahuac-button" routerLink="/login">logout</button>
          } @else {
            <button matButton="filled" class="custom-anahuac-button" routerLink="/login">login</button>
          }
        </div>
        <div class="flex flex-1">
          &nbsp;
        </div>
        <div class="flex flex-row justify-end">
          @if (this.store.verifyUserLogin().isAuthenticated) {
            <app-ticker-dropdown />
          } @else {
            <p>&nbsp;</p>
          }
        </div>
      </div>
    </header>
  `,
  styles: ``,
})
export class Header {
  store = inject(appSignalStore);
}
