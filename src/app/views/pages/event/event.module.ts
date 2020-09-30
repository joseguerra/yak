import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventComponent } from "./event.component";
import { SharedModule } from "src/app/shared/shared.module";
import { EventRoutes } from "./event.routing";

@NgModule({
  imports: [CommonModule, SharedModule, EventRoutes],
  declarations: [EventComponent],
})
export class EventModule {}
