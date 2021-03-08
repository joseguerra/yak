import { Component, OnInit } from "@angular/core";
import { ProductService } from "./shared/services/product.service";
import { fadeAnimation } from "./shared/animations/fadeIntRoute";
declare var $: any;
@Component({
  selector: "app-root",
  template: `
    <div>
      <app-navbar> </app-navbar>
      <main [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet">
          <a
            *ngIf="productService.getValueCurrency() === 'price_ve'"
            class="qlwapp-toggle"
            data-action="open"
            data-phone="+584247117137"
            data-message="Buen día, podrías darme información sobre tus productos 
        ?"
            href="https://wa.me/+584247117137?text=Buen%20día,%20podrías%20darme%20información%20sobre%20tus%20productos%20?"
            target="_blank"
          >
            <i class="fa fa-whatsapp"></i>
            <span class="padding-left">
              Bienvenido(a) a Yak Brake! Contáctanos.
            </span>
          </a>
          <a
            *ngIf="productService.getValueCurrency() === 'price_co'"
            class="qlwapp-toggle"
            data-action="open"
            data-phone="+573157005569"
            data-message="Buen día, podrías darme información sobre tus productos 
        ?"
            href="https://wa.me/+573157005569?text=Buen%20día,%20podrías%20darme%20información%20sobre%20tus%20productos%20?"
            target="_blank"
          >
            <i class="fa fa-whatsapp"></i>
            <span class="padding-left">
              Bienvenido(a) a Yak Brake! Contáctanos.
            </span>
          </a>
        </router-outlet>
      </main>

      <div
        class="modal fade top"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        mdbModal 
        #frame="mdbModal"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        class="modal fade top"
      >
        <div class="modal-dialog modal-notify modal-success" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <p class="heading lead">Bienvenido a Yak Brake</p>
      
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="frame.hide()">
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Puedes cambiar tu moneda y metodos de pago en la esquina superior
              derecha
            </div>
            <div class="modal-footer">
              <a
                type="button"
                mdbBtn 
                color="success"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                OK
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- <app-footer></app-footer> -->
      <app-loader-spinner></app-loader-spinner>
    </div>
  `,
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation],
})
export class AppComponent implements OnInit {
  constructor(public productService: ProductService) {}

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
