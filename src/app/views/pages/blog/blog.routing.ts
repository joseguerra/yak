import { IndexComponent } from "../../base/index/index.component";

import { BlogListComponent } from "./blog-list/blog-list.component";
import { Routes } from "@angular/router";

import { BlogDetailComponent } from "./blog-detail/blog-detail.component";

export const BlogRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "all-blogs",
        component: BlogListComponent,
      },
      {
        path: ":id",
        component: BlogDetailComponent,
      }
    ],
  },
];
