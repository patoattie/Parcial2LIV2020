import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../clases/producto';
import { Usuario } from '../../clases/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto } from '../../enums/tipo-producto.enum';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Input() locales: Usuario[];
  @Output() cerrarEvent = new EventEmitter<void>();
  @Output() guardarEvent = new EventEmitter<Producto>();
  @Output() errorEvent = new EventEmitter<string>();
  public productoForm: FormGroup;
  public enumTipo = Object.values(TipoProducto).filter(unTipo => typeof unTipo === 'string');

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: [this.producto.nombre, Validators.compose([Validators.required])],
      marca: [this.producto.marca, Validators.compose([Validators.required])],
      stock: [this.producto.stock, Validators.compose([Validators.required, Validators.min(0)])],
      tipo: [this.producto.tipo, Validators.compose([Validators.required])],
      local: [this.producto.local, Validators.compose([Validators.required])],
      precio: [this.producto.precio, Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  public guardar(): void {
    if (this.productoForm.valid) {
      this.producto.nombre = this.productoForm.controls.nombre.value;
      this.producto.marca = this.productoForm.controls.marca.value;
      this.producto.stock = this.productoForm.controls.stock.value;
      this.producto.tipo = this.productoForm.controls.tipo.value;
      this.producto.local = this.productoForm.controls.local.value;
      this.producto.precio = this.productoForm.controls.precio.value;
      this.guardarEvent.emit(this.producto);
      this.cerrar();
    }
  }

  public cerrar(): void {
    this.cerrarEvent.emit();
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'nombre':
        if (this.productoForm.controls.nombre.hasError('required')) {
          retorno = 'Debe ingresar un nombre de producto';
        } else {
          retorno = 'Error inesperado con el nombre de producto';
        }
        break;
      case 'marca':
        if (this.productoForm.controls.marca.hasError('required')) {
          retorno = 'Debe ingresar una marca';
        } else {
          retorno = 'Error inesperado con la marca';
        }
        break;
      case 'stock':
        if (this.productoForm.controls.stock.hasError('required')) {
          retorno = 'Debe ingresar un stock';
        } else if (this.productoForm.controls.stock.hasError('min')) {
          retorno = 'El stock no puede ser negativo';
        } else {
          retorno = 'Error inesperado con el stock';
        }
        break;
      case 'tipo':
        if (this.productoForm.controls.tipo.hasError('required')) {
          retorno = 'Debe ingresar un tipo de producto';
        } else {
          retorno = 'Error inesperado con el tipo de producto';
        }
        break;
      case 'local':
        if (this.productoForm.controls.local.hasError('required')) {
          retorno = 'Debe ingresar un local';
        } else {
          retorno = 'Error inesperado con el local';
        }
        break;
      case 'precio':
        if (this.productoForm.controls.precio.hasError('required')) {
          retorno = 'Debe ingresar un precio';
        } else if (this.productoForm.controls.precio.hasError('min')) {
          retorno = 'El precio no puede ser negativo';
        } else {
          retorno = 'Error inesperado con el precio';
        }
        break;
    }

    return retorno;
  }
}
