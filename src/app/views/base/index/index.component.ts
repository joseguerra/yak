import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/models/product";
import { OrderService } from "../../../shared/services/order.service";
import { Order } from "../../../shared/models/order";
import { StoresService } from "../../../shared/services/stores.service";
import { Store } from "../../../shared/models/store";
import { ToastrService } from "src/app/shared/services/toastr.service";
declare var $: any;

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  carouselList = [
    {
      bannerImg: "./assets/banner_img/yak_1.jpg",
    },
    {
      bannerImg: "./assets/banner_img/yak_2.jpg",
    },
    {
      bannerImg: "./assets/banner_img/yak_3.jpg",
    },
    {
      bannerImg: "./assets/banner_img/yak_7.png",
    }
  ];
  products: Product[];
  load = false;
  date: number;
  totalPrice = 0;
  images = [];
  productList: Store[] = [];
  loadStores = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public storesService: StoresService,
    public orderService: OrderService,
    private toastrService: ToastrService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.getAllStores();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.ref_payco) {
        this.products = this.productService.getLocalCartProducts();
        this.products.forEach((product) => {
          for (let i = 0; i < product.cartQuantity; i++) {
            this.totalPrice += product[this.productService.getValueCurrency()];
          }
        });
        this.date = Date.now();

        const x = this.orderService.getOrderById(params.ref_payco);
        x.snapshotChanges().subscribe(
          (product) => {
            if (!product.length && localStorage.getItem("check") === "true") {
              this.createOrder(params.ref_payco);
            }
            product.forEach((element) => {
              const y = {
                ...element.payload.toJSON(),
                $key: element.key,
              } as Order;
            });
          },
          (err) => {}
        );
      }
    });
  }

  getAllStores() {
    this.loadStores = false;
    const x = this.storesService.getStores();
    x.snapshotChanges().subscribe(
      (product) => {
        console.log(product);
        this.productList = [];
        product.forEach((element) => {
          const y = {
            ...element.payload.toJSON(),
            $key: element.key,
          } as Store;
          this.productList.push(y);
          this.images.push({
            path: y.path
          })
        });
        this.loadStores = true;
        console.log(this.productList);

      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  createOrder(id) {
    this.load = true;
    this.productService.updateQuantityProduct();

    for (let i = 0; i < this.products.length; i++) {
      delete this.products[i].$key;
    }

    const payload: Order = {
      ...JSON.parse(localStorage.getItem("formData")),
      products: this.products,
      total: this.totalPrice,
      status: "IK_TODO",
      date: this.date,
      id: id,
    };

    this.orderService.createOrder(payload, () => {
      localStorage.setItem("check", "false");
      this.productService.deleteCart();
      this.load = false;

      $("#exampleModalCenter").modal("show");
    });
  }
}
