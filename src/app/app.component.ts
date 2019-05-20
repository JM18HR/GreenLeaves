import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams} from '@angular/common/http';

let Longitude;
let Latitude;
let getjson;
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  success = false;
  realizado = true;
  public ubicacion:string;
  public temperatura:string;
  public loading: boolean;

  constructor(private modalservice: NgbModal) {
    getLocation();
    this.loading = false;
  }
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  formRegister = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$')]),
    fecha: new FormControl('', [Validators.required]),
  });
  fecha = '';

  onSubmit(modal) {
    if (this.formRegister.valid === true) {
      
     extrae_temperatura(Longitude,Latitude);
     this.loading=true;
     setTimeout(() => {
       this.ubicacion=getjson.weatherObservation.stationName;
       this.temperatura=getjson.weatherObservation.temperature;
       this.fecha = this.formRegister.value.fecha.day + ' de ' + this.months[this.formRegister.value.fecha.month - 1] + ' del ' + this.formRegister.value.fecha.year;
       this.success = true;
       this.realizado = false;
       this.loading=false;
     }, 3000);
    }
    else {
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

  
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {

  }
}

export function showPosition(position) {
  Longitude = position.coords.longitude;
  Latitude = position.coords.latitude;
}

export function extrae_temperatura(lon: string, lat: string) {
  var data = null;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
     getjson=JSON.parse(this.responseText);
    }
  });
  xhr.open("POST", 'http://api.geonames.org/findNearByWeatherJSON?lat=' + lat + '&lng=' + lon + '&username=jesus_18');
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhr.withCredentials = false;
  xhr.send(data);
}