import { Blog } from "../../../../shared/models/blog";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../../../shared/services/blog.service";
import { ToastrService } from "src/app/shared/services/toastr.service";

@Component({
  selector: "app-stores-detail",
  templateUrl: "./stores-detail.component.html",
  styleUrls: ["./stores-detail.component.scss"],
})
export class storesDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: any;
  loading: boolean = true;
  valueList = [];
  url: string;
  constructor(
    private route: ActivatedRoute,
    public blogService: BlogService,
    private toastrService: ToastrService
  ) {
    this.product = new Blog();
  }

  ngOnInit() {
    window.scrollTo(0,0);


    this.sub = this.route.params.subscribe((params) => {
      this.url = params.id
      this.getProductDetail();
    });
  }


  getProductDetail() {
    this.loading = true;
    const x = this.blogService.getBlogById();
    x.snapshotChanges().subscribe(
      (product) => {
        console.log(product);
        const y = { ...(product.payload.toJSON() as Blog)};
        
        let obj: any = Object.values(y);
        console.log(obj);
        for (let i = 0; i < obj.length; i++) {
          if(obj[i].url === this.url){
            this.product = Object.values(y)[i];
          }
        }
        console.log(this.product);

        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
