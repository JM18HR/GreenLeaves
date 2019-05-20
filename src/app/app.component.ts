import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Clientes } from './models/clientes'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  success=false;
  realizado=true;
  constructor(private modalservice:NgbModal){}
  months= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  formRegister = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
    email:  new FormControl('',[Validators.required,Validators.email,Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]),
    telefono:  new FormControl('',[Validators.required,Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]),
    fecha:  new FormControl('',[Validators.required]),
    ciudad: new FormControl('',[Validators.required,Validators.minLength(15),Validators.maxLength(100)]),
  });
  fecha='';
  onSubmit(modal) {
    if(this.formRegister.valid===true){
      this.fecha=this.formRegister.value.fecha.day+' de '+this.months[this.formRegister.value.fecha.month-1]+' del '+this.formRegister.value.fecha.year;
      this.success=true;
      this.realizado=false;
    }
    else{
      this.modalservice.open(modal);
    }
  }

  get nombre() {
    return this.formRegister.get('nombre');
  }

  get correo() {
    return this.formRegister.get('email');
  }

  get telefono() {
    return this.formRegister.get('telefono');
  }

  get fecha_sel() {
    return this.formRegister.get('fecha');
  }
  
  get ciudad(){
    return this.formRegister.get('ciudad');
  }
}
