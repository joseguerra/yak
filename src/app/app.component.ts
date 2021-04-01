import { Component, OnInit } from "@angular/core";
import { ProductService } from "./shared/services/product.service";
import { fadeAnimation } from "./shared/animations/fadeIntRoute";
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;
declare let fbq:Function;
import { filter } from 'rxjs/operators';

declare var gtag;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {


  constructor(private router: Router, public productService: ProductService){
    router.events.subscribe((y: NavigationEnd) => {
      if(y instanceof NavigationEnd){
        fbq('track', 'PageView');
      }
    })
    const navEndEvents$ = this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    );

    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-152416771-1', {
        'page_path': event.urlAfterRedirects
      });
    });
  }

  

  ngOnInit() {
    if (this.productService.getValueCurrency() !=='price_ve' && this.productService.getValueCurrency() !=='price_co') {
      $("#exampleModalCenter").modal("show");
      this.productService.addToValue('price_ve');
    }

    //if (navigator.geolocation) {
    //  navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    //}
  }
}
