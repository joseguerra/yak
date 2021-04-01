import { QuestionsComponent } from "./questions.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: QuestionsComponent
  },
];

export const QuestionsRoutes = RouterModule.forChild(routes);
