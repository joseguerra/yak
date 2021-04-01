import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionsComponent } from "./questions.component";
import { SharedModule } from "src/app/shared/shared.module";
import { QuestionsRoutes } from "./questions.routing";

@NgModule({
  imports: [CommonModule, SharedModule, QuestionsRoutes],
  declarations: [QuestionsComponent],
})
export class QuestionsModule {}
