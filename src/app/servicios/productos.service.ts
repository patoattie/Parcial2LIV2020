import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private afs: AngularFirestore) { }

  public traerTodos() {
    return this.afs.collection<Producto>('productos').valueChanges();
  }

  public traerUno(uid: string) {
    return this.afs.doc<Producto>(`productos/${uid}`).valueChanges();
  }

  public nuevo(producto: Producto) {
    return this.afs.collection<Producto>('productos').add(Object.assign({}, producto))
    .then(call => {
      producto.uid = call.id;
      this.actualizar(producto.uid, producto);
    });
  }

  public actualizar(uid: string, producto: Producto) {
    return this.afs.doc<Producto>(`productos/${uid}`).set(Object.assign({}, producto), {merge: true});
  }

  public borrar(uid: string) {
    return this.afs.doc<Producto>(`productos/${uid}`).delete();
  }
}
