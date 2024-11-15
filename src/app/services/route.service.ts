import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  router = inject(Router)

  navigate(url: string){
    this.router.navigateByUrl('', ).then(() => {
      // Poi naviga di nuovo all'URL originale, forzando il reload
      this.router.navigateByUrl(url);
    });
  }
}
