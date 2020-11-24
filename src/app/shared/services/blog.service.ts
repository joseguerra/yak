import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Blog } from "../models/blog";
import { ToastrService } from "./toastr.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { firestore} from 'firebase-admin';

@Injectable()
export class BlogService {
  blogs: AngularFireList<any>;
  blog: AngularFireObject<Blog>;
  constructor(
    private db: AngularFireDatabase,
    private toastrService: ToastrService,
    private storage: AngularFireStorage,
  ) {}

  getBlogs() {
    this.blogs = this.db.list("blogs");
    return this.blogs;
  }

  createBlog(data: Blog, callback: () => void) {
    this.blogs.push(data);
    callback();
  }

  updateBlog(key, data: Blog) {
    console.log(key);
    this.blogs.update(key, data);
    this.toastrService.wait("Perfecto", "Blog Actualizada");
    return this.blogs;
  }

  getBlogById() {
    this.blog = this.db.object("blogs/");
    return this.blog;
  }

  deleteBlog(key: string) {
    this.blogs.remove(key);
  }

  firestoreUploadImage(datos: File, nombreArchivo: string) {
    return this.storage.upload(nombreArchivo, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
