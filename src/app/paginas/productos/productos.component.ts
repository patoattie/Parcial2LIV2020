import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ToastService } from '../../servicios/toast.service';
import { Producto } from '../../clases/producto';
import { Usuario } from '../../clases/usuario';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {
  private listaProductos: Producto[];
  private listaLocales: Usuario[];
  public columnas: string[] = ['nombre', 'marca', 'stock', 'tipo', 'local', 'precio'];
  private desuscribir = new Subject<void>();
  public muestraDetalle = false;
  public fila: Producto;
  private esNuevo: boolean;
  public datos: MatTableDataSource<Producto>;

  constructor(
    private productos: ProductosService,
    private usuarios: UsuariosService,
    private toast: ToastService
  ) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.productos.traerTodos()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(call => {
      this.listaProductos = call;
      this.datos = new MatTableDataSource(this.listaProductos);

      this.datos.filterPredicate = (item, filtro) => {
        return item.local.trim().toLowerCase().includes(filtro)
          || item.marca.trim().toLowerCase().includes(filtro)
          || item.nombre.trim().toLowerCase().includes(filtro)
          || item.precio.toString().trim().includes(filtro)
          || item.stock.toString().trim().includes(filtro)
          || item.tipo.trim().toLowerCase().includes(filtro);
      };

      this.datos.sort = this.sort;
    });

    this.usuarios.traerTodos()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(call2 => this.listaLocales = call2.filter(unLocal => unLocal.tipo === TipoUsuario[TipoUsuario.LOCAL]));
  }

  ngOnDestroy(): void {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  public editarFila(unProducto: Producto): void {
    if (!this.muestraDetalle) {
      this.fila = new Producto();

      if (unProducto === null) {
        this.esNuevo = true;

        this.fila.local = null;
        this.fila.marca = null;
        this.fila.nombre = null;
        this.fila.precio = null;
        this.fila.stock = null;
        this.fila.tipo = null;
        this.fila.uid = null;

        this.muestraDetalle = true;
      } else {
        this.esNuevo = false;

        this.fila.local = unProducto.local;
        this.fila.marca = unProducto.marca;
        this.fila.nombre = unProducto.nombre;
        this.fila.precio = unProducto.precio;
        this.fila.stock = unProducto.stock;
        this.fila.tipo = unProducto.tipo;
        this.fila.uid = unProducto.uid;
      }
    }
  }

  public cerrarDetalle(): void {
    this.muestraDetalle = false;
  }

  public mostrarError(msj: string): void {
    this.toast.mostrarError(msj);
  }

  public guardar(nuevo: Producto): void {
    if (this.esNuevo && this.listaProductos.find(unProducto =>
      unProducto.local === nuevo.local
      && unProducto.marca === nuevo.marca
      && unProducto.nombre === nuevo.nombre
      && unProducto.tipo === nuevo.tipo
    ) !== undefined) {
      this.mostrarError('No se puede dar de alta el Producto, ya existe en la lista');
    } else {
      if (this.esNuevo) {
        this.productos.nuevo(nuevo)
        .then(() => {
          this.toast.mostrarOk('Alta OK');
          this.cerrarDetalle();
        })
        .catch(e => console.log(e));
      } else {
        this.productos.actualizar(nuevo.uid, nuevo)
        .then(() => {
          this.toast.mostrarOk('Actualización OK');
          this.cerrarDetalle();
        })
        .catch(e => console.log(e));
      }
    }
  }

  public getLocales(): Usuario[] {
    return this.listaLocales;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();
  }
}
