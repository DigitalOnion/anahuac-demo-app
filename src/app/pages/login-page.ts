import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { verifyUserLoginSignal } from '../data/signal-store';
import { VerifyLoginService, VerifyLoginType } from '../model/verify-login.service';
import { HotToastService } from '@ngxpert/hot-toast';

import { tickerSignal } from '../data/signal-store';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, MatAnchor, RouterLink],
  template: `
    <div class="flex flex-row max-w-[1200px] mx-auto w-full bg-transparent text-black p-4">
      <div class="flex flex-row w-full rounded-lg border border-gray-300 p-8">

        <form [formGroup]="loginForm" class="w-full">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input id="username" formControlName="username" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>

          <label for="password" class="block text-sm font-medium text-gray-700 mt-4">Password</label>
          <input id="password" formControlName="password" type="password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"/>

          <div class="flex flex-column mt-8 w-full gap-4">
            <button matButton="outlined" class="custom-anahuac-button w-full" routerLink="/portal">Cancelar</button>
            <button matButton="filled" class="custom-anahuac-button w-full" routerLink="/working" (click)="verifyUser($event)">Login</button>
          </div>
        </form>

      </div>
      <div class="flex w-full">
        &nbsp;
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginPage {
  private loginService = inject(VerifyLoginService);
  private router = inject(Router);
  private toast = inject(HotToastService);
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
    tickerSignal.set('');
    verifyUserLoginSignal.set(false);
  }

  verifyUser(event: Event) {
    const username = this. loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loginService.verifyPromise(username as string, password as string)
      .then((verifyString: string) => {
        let verify: VerifyLoginType = JSON.parse(verifyString);
        verifyUserLoginSignal.set(verify.isAuthenticated)
        if(verify.isAuthenticated) {
          this.router.navigate(['/working']);
        } else {
          this.toast.error("Login failed: " + verify.message);
          event.preventDefault();
        }
      }
    )
  }
}
   