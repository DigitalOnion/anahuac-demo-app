import { CanActivateFn } from '@angular/router';
import { appSignalStore } from '../data/signal-store';
import { inject } from '@angular/core';

export const workingGuard: CanActivateFn = (route, state) => {
  const store = inject(appSignalStore)
  return store.verifyUserLogin().isAuthenticated
};
