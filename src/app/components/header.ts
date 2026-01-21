import { Component } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [MatAnchor, RouterLink],
  template: `
    <header class="flex flex-row max-w-[1200px] mx-auto w-full bg-transparent text-black p-4">
      <div class="flex flex-row w-full">
        <div class="bg-orange-500 p-4 rounded-lg">
          <img src="images/anahuac-de-Queretaro.png" alt="Univesidad Anáhuac de Querétaro" class="h-28"/>
        </div>
        <div class="flex flex-col ml-10">
          <h1 class="text-3xl font-bold">API Demo Application</h1>
          <p>Luis Virueña</p>
        </div>
      </div>
      <button matButton="filled" class="custom-anahuac-button" routerLink="/login">login</button>
    </header>
    `,
  styles: ``,
})
export class Header {

}
