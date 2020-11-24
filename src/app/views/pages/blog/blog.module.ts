// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { BlogRoutes } from "./blog.routing";

// Components
import { BlogComponent } from "./blog.component";
import { BlogListComponent } from "./blog-list/blog-list.component";
import { BlogDetailComponent } from "./blog-detail/blog-detail.component";
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
    RouterModule.forChild(BlogRoutes),
    SharedModule
  ],
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogDetailComponent
   ]
})
export class BlogModule {}
