import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  var authService = inject(AuthService)
  var router = inject(Router)
  console.log("guard", authService.currentUserSig())
  if (authService.currentUserSig() === null){
    //router.navigate(['/login']);
    return false
  }
  return true;
};
