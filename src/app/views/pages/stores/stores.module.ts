// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { StoresRoutes } from "./stores.routing";

// Components
import { StoresComponent } from "./stores.component";
import { StoresListComponent } from "./stores-list/stores-list.component";
import { storesDetailComponent } from "./stores-detail/stores-detail.component";
import { SharedModule } from "../../../shared/shared.module";
import { NgxGalleryModule } from "ngx-gallery-9";
import { NgxDropzoneModule } from "ngx-dropzone";
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    CommonModule,
    NgxGalleryModule,
    NgxDropzoneModule,
    AngularEditorModule,
    RouterModule.forChild(StoresRoutes),
    SharedModule
  ],
  declarations: [
    StoresComponent,
    StoresListComponent,
    storesDetailComponent
   ]
})
export class StoresModule {}
