import { Component, Injectable, Input } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NgForm } from '@angular/forms';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

var datos_completos;

@Injectable()
export class Service {
  constructor(private http: HttpClient) { }
  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .get('http://api.geonames.org/searchJSON?maxRows=20&username=jesus_18&name="' + term + '"&lang=es&searchlang=es', { params: PARAMS.set('search', term) }).pipe(
        map(response => {
          datos_completos = response;
          var retorno = new Array();
          var tam: number = datos_completos.geonames.length;
          for (var x = 0; x < tam; x++) {
            retorno.push(datos_completos.geonames[x].toponymName + ',' + datos_completos.geonames[x].adminName1 + ',' + datos_completos.geonames[x].countryName);
          }
          return retorno;
        })
      );
  }
}

//api.geonames.org/searchJSON?maxRows=20&username=jesus_18&name="monterrey"&lang=es&searchlang=es

@Component({
  selector: 'app-search-auto',
  templateUrl: './search-auto.component.html',
  providers: [Service],
  styleUrls: ['./search-auto.component.css']
})

export class SearchAutoComponent {

  public model: any;
  searching = false;
  searchFailed = false;
  @Input() parenteform:NgForm;
  @Input() formcontrolname:string;
  @Input() labelcontrol:string;
  constructor(private _service: Service) { }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
}
