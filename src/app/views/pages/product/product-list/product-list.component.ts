import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../../../../shared/models/product";
import { AuthService } from "../../../../shared/services/auth.service";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxDropzoneComponent } from "ngx-dropzone";
import { async, Observable, Observer } from "rxjs";
declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require("shortid");
const moment = require("moment");
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @ViewChild(NgxDropzoneComponent) componentRef: NgxDropzoneComponent;
  dropzone: any;
  base64Image: any;
  product: Product = new Product();
  productList: Product[] = [];
  loading = false;
  loadingImage = false;
  edit = true;
  files: File[] = [];
  brands = [
    "All",
    "Frenos",
    "Cauchos",
    "Tripas",
    "Parches",
    "Cadenas",
    "Discos",
    "Cascos",
  ];
  images: string[] = [];
  selectedBrand: "All";
  messageTitle = "No hay productos";
  messageDescription = "Por favor, Intente con otro Producto";
  page = 1;
  constructor(
    public authService: AuthService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      console.log(id);
      if (id) {
        this.getAllProductsById(id);
      } else {
        this.getAllProducts();
      }
    });
  }

  onSelect(event) {
    this.loadingImage = true;
    this.files.push(...event.addedFiles);
    this.productService
      .firestoreUploadImage(
        event.addedFiles[0],
        this.product.productSKU + "/" + event.addedFiles[0].name + "/"
      )
      .then((data) => {
        let referencia = this.productService.referenciaCloudStorage(
          this.product.productSKU + "/" + event.addedFiles[0].name + "/"
        );
        referencia.getDownloadURL().subscribe((data) => {
          console.log(data);
          this.images.push(data);
          console.log(this.images);
          this.loadingImage = false;
        });
      });
  }

  onRemove(event, i) {
    this.files.splice(this.files.indexOf(event), 1);
    this.images.splice(i,1);
    console.log(this.images);
  }

  openEdit(product: Product) {
    this.files = [];
    this.images = [];
    this.edit = true;
    this.loadingImage = true;
    this.product = product;
    for (let i = 0; i < Object.values(this.product.images).length; i++) {
      this.images.push(this.product.images[i]);
      this.getBase64ImageFromURL(this.product.images[i]).subscribe(base64data => {
        fetch('data:image/jpg;base64,' + base64data)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "File name",{ type: "image/png" })
          this.files.push(file);
          this.loadingImage = false;
        })
      });
    }
  }

  editProduct(product) {
    let key: string = JSON.stringify(this.product.$key);
    key = key.replace(/["']/g, "");
    delete this.product.$key;
    console.log(this.images);
    product.images = this.images;
    this.productService
      .editProduct(key, product)
      .snapshotChanges()
      .subscribe((products) => {
        this.getAllProducts();
        $("#exampleModalLong").modal("hide");
      });
  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        console.log(product);
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = {
            ...element.payload.toJSON(),
            $key: element.key,
          } as Product;
          this.productList.push(y);
        });
        console.log(this.productList);

      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  getAllProductsById(id) {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        let products = [];
        product.forEach((element) => {
          const y = {
            ...element.payload.toJSON(),
            $key: element.key,
          } as Product;

          products.push(y);
        });
        console.log(products);

        this.productList = products.filter(
          (state) =>
            state.productName.toLowerCase().indexOf(id.toLowerCase()) != -1 ||  state.productDescription.toLowerCase().indexOf(id.toLowerCase()) != -1
        );

        console.log(this.productList);
      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;  img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  openCreate() {
    this.edit = false;
    this.product = new Product();
  }

  createProduct(productForm: NgForm) {
    const payload: Product = {
      ...productForm.value,
      cartQuantity: 1,
      images: this.images,
      productId: "PROD_" + shortId.generate(),
      productAdded: moment().unix(),
      ratings: Math.floor(Math.random() * 5 + 1),
      favourite: false,
    };

    this.productService.createProduct(payload, () => {
      this.getAllProducts();
      $("#exampleModalLong").modal("hide");
      toastr.success("Producto Agregado", "Producto Agregado");
    });
  }
}
