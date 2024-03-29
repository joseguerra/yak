// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { ProductRoutes } from "./product.routing";

// Components
import { CheckoutModule } from "./checkout/checkout.module";

import { ProductComponent } from "./product.component";
import { BestProductComponent } from "./best-product/best-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { ContactComponent } from "./contact/contact.component";
import { OurComponent } from "./our/our.component";
import { AddCatalogComponent } from "./add-catalog/add-catalog.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SharedModule } from "../../../shared/shared.module";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";
import { NgxGalleryModule } from "ngx-gallery-9";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoadingImageComponent} from '../../.././components/loader.image'
@NgModule({
  imports: [
    CommonModule,
    NgxGalleryModule,
    NgxDropzoneModule,
    AngularEditorModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule,
    CheckoutModule,
  ],
  declarations: [
    LoadingImageComponent,
    ProductComponent,
    BestProductComponent,
    ProductListComponent,
    CatalogComponent,
    ContactComponent,
    OurComponent,
    AddCatalogComponent,
    ProductDetailComponent,
    FavouriteProductsComponent,
    CartProductsComponent,
    CartCalculatorComponent,
  ],
  exports: [BestProductComponent],
})
export class ProductModule {}
