import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Store } from "../models/store";
import { ToastrService } from "./toastr.service";
import { AngularFireStorage } from "@angular/fire/storage";
import { firestore} from 'firebase-admin';

@Injectable()
export class StoresService {
  stores: AngularFireList<any>;
  store: AngularFireObject<Store>;
  constructor(
    private db: AngularFireDatabase,
    private toastrService: ToastrService,
    private storage: AngularFireStorage,
  ) {}

  getStores() {
    this.stores = this.db.list("stores");
    return this.stores;
  }

  createStore(data: Store, callback: () => void) {
    this.stores.push(data);
    callback();
  }

  updateStore(key, data: Store) {
    console.log(key);
    this.stores.update(key, data);
    this.toastrService.wait("Perfecto", "Tienda Actualizada");
    return this.stores;
  }

  getStoreById() {
    this.store = this.db.object("stores/");
    return this.store;
  }

  deleteStore(key: string) {
    this.stores.remove(key);
  }

  firestoreUploadImage(datos: File, nombreArchivo: string) {
    return this.storage.upload(nombreArchivo, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
