import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "../../../../shared/models/store";
import { AuthService } from "../../../../shared/services/auth.service";
import { StoresService } from "../../../../shared/services/stores.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxDropzoneComponent } from "ngx-dropzone";
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { async, Observable, Observer } from "rxjs";
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require("shortid");
const moment = require("moment");
@Component({
  selector: "app-stores-list",
  templateUrl: "./stores-list.component.html",
  styleUrls: ["./stores-list.component.scss"],
})
export class StoresListComponent implements OnInit {
  @ViewChild(NgxDropzoneComponent) componentRef: NgxDropzoneComponent;
  dropzone: any;
  base64Image: any;
  product: Store = new Store();
  productList: Store[] = [];
  loading = false;
  loadingImage = false;
  edit = true;
  files: File[] = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};



  images: string[] = [];

  messageTitle = "No hay tiendas";
  messageDescription = "Por favor, Intente con otro Tienda";
  page = 1;
  constructor(
    public authService: AuthService,
    public storesService: StoresService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }


  onRemove(event, i) {
    this.files.splice(this.files.indexOf(event), 1);
    this.images.splice(i,1);
    console.log(this.images);
  }

  openEdit(product: Store) {

    this.edit = true;
    this.product = product;
  }


  editProduct(product) {
    let key: string = JSON.stringify(this.product.$key);
    key = key.replace(/["']/g, "");
    delete this.product.$key;
    console.log(this.images);
    product.images = this.images;
    this.storesService
      .updateStore(key, product)
      .snapshotChanges()
      .subscribe((products) => {
        this.getAllProducts();
        $("#exampleModalLong").modal("hide");
      });
  }

  getAllProducts() {
    this.loading = true;
    const x = this.storesService.getStores();
    x.snapshotChanges().subscribe(
      (product) => {
        console.log(product);
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = {
            ...element.payload.toJSON(),
            $key: element.key,
          } as Store;
          this.productList.push(y);
        });
        console.log(this.productList);

      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.storesService.deleteStore(key);
  }

  openCreate() {
    this.edit = false;
    this.product = new Store();
  }

  onSelect(event) {
    this.loadingImage = true;
    this.files.push(...event.addedFiles);
    this.storesService
      .firestoreUploadImage(
        event.addedFiles[0],
        "stores"+"/" + event.addedFiles[0].name + "/"
      )
      .then((data) => {
        let referencia = this.storesService.referenciaCloudStorage(
          "stores"+"/" + event.addedFiles[0].name + "/"
        );
        referencia.getDownloadURL().subscribe((data) => {
          this.product.path = data;
          this.loadingImage = false;
        });
      });
  }

  createProduct(productForm: NgForm) {
    const payload: Store = {
      ...productForm.value,
      path: this.product.path,
      storeId: "PROD_" + shortId.generate()
    };

    this.storesService.createStore(payload, () => {
      this.getAllProducts();
      $("#exampleModalLong").modal("hide");
      toastr.success("Tienda Agregada", "Tienda Agregada");
    });
  }
}
