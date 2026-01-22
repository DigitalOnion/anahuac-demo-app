import { Component, inject } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { verifyUserLoginSignal } from '../data/signal-store';
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

      <div class="flex flex-col justify-end">
        @if (signal()) {
          <button matButton="filled" class="custom-anahuac-button" routerLink="/login">logout</button>
        } @else {
          <button matButton="filled" class="custom-anahuac-button" routerLink="/login">login</button>
        }
        <p>&nbsp;</p>
        @if (signal()) {
          <app-ticker-dropdown />
        }
      </div>
    </header>
  `,
  styles: ``,
})
export class Header {
  signal = verifyUserLoginSignal;
}
