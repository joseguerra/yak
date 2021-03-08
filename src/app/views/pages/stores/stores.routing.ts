import { IndexComponent } from "../../base/index/index.component";

import { StoresListComponent } from "./stores-list/stores-list.component";
import { Routes } from "@angular/router";

import { storesDetailComponent } from "./stores-detail/stores-detail.component";

export const StoresRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "all-stores",
        component: StoresListComponent,
      },
      {
        path: ":id",
        component: storesDetailComponent,
      }
    ],
  },
];
