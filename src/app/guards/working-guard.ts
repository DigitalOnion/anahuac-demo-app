import { CanActivateFn } from '@angular/router';
import { verifyUserLoginSignal } from '../data/signal-store';

export const workingGuard: CanActivateFn = (route, state) => {
  return verifyUserLoginSignal();
};
