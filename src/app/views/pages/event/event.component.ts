import { Component, OnInit } from "@angular/core";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { EventService } from "../../../shared/services/event.service";
import { NgForm } from "@angular/forms";
import { Event } from "../../../shared/models/event";
import { Router } from "@angular/router";
declare var $: any;
declare var toastr: any;
@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  kanbanContainers = [
  ];
  load = false;
  order: any = [];
  cartQuantity = 0;
  totalValue = 0;
  event: Event = new Event();
  inicio = 'https://wa.me/+584247117137?text=Hola, me gustaría inscribirme en la carrera yak %0A======== Corredor =======%0A';
  constructor(public eventService: EventService,
    private router: Router,
    private toastrService: ToastrService) {}

  ngOnInit() {
  }

  addRider() {

    this.event.productPrice = 2;
    this.event.productDescription = '1';

    this.eventService.addRider(this.event, () => {
      $("#exampleModalLong").modal("hide");
      toastr.success(
        "Te contactaremos",
        "Perfecto"
      );
      this.router.navigate(["/"]);
    });
  }
}
