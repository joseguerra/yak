import { TermsComponent } from "./terms.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: TermsComponent
  },
];

export const TermsRoutes = RouterModule.forChild(routes);
