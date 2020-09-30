import { EventComponent } from "./event.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: EventComponent
  },
];

export const EventRoutes = RouterModule.forChild(routes);
