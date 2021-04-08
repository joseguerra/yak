import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { NoAccessComponent } from "./shared/components/no-access/no-access.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./views/base/index/index.module").then((m) => m.IndexModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./views/pages/product/product.module").then(
            (m) => m.ProductModule
          ),
      },
      {
        path: "blog",
        loadChildren: () =>
          import("./views/pages/blog/blog.module").then(
            (m) => m.BlogModule
          ),
      },
      {
        path: "stores",
        loadChildren: () =>
          import("./views/pages/stores/stores.module").then(
            (m) => m.StoresModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./views/pages/user/user.module").then((m) => m.UserModule),
      },
      {
        path: "task-board",
        loadChildren: () =>
          import("./views/pages/task-board/task-board.module").then(
            (m) => m.TaskBoardModule
          ),
      },
      {
        path: "events",
        loadChildren: () =>
          import("./views/pages/event/event.module").then(
            (m) => m.EventModule
          ),
      },
      {
        path: "questions",
        loadChildren: () =>
          import("./views/pages/questions/questions.module").then(
            (m) => m.QuestionsModule
          ),
      },
      {
        path: "terms",
        loadChildren: () =>
          import("./views/pages/terms/terms.module").then(
            (m) => m.TermsModule
          ),
      }
    ],
  },
  { path: "no-access", component: NoAccessComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
