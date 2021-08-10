import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    let url: string = state.url;
    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    if(this.authService.isLoggedIn()) {
      return true;
    }
    this.authService.redirectToUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
