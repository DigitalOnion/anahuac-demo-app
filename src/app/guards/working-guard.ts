import { CanActivateFn } from '@angular/router';

export const workingGuard: CanActivateFn = (route, state) => {
  return false;
};
