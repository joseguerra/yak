import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermsComponent } from "./terms.component";
import { TermsRoutes } from "./terms.routing";

@NgModule({
  imports: [CommonModule, TermsRoutes],
  declarations: [TermsComponent],
})
export class TermsModule {}
