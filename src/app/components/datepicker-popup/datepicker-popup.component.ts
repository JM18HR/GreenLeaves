import {Component,Injectable, Input,Renderer2, ViewChild, ElementRef} from '@angular/core';
import {NgbDate,NgbCalendar,NgbDatepickerI18n, NgbDateStruct, NgbButtonLabel, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, NgModel, FormGroup } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  'es': {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  }
  // other languages you would support
};

const new_today=new Date();
@Injectable()
export class I18n {
  language = 'es';
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}


function padNumber(value: number) {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return "";
  }
}
@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split("/");
        if (dateParts.length === 1 && isNumber(dateParts[0])) {
            return {year: toInteger(dateParts[0]), month: null, day: null};
        } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
            return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
        } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
            return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
        }
    }   
    return null;
}// from input -> internal model
 format(date: NgbDateStruct): string {
  let stringDate: string = ""; 
  if (date) {

      stringDate += isNumber(date.day) ? padNumber(date.day) + " de " : "";

      stringDate += isNumber(date.month) ?  I18N_VALUES['es'] .months[date.month-1] + " del " : "";
    
      stringDate += date.year;
  }
  return stringDate;
}
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}/${date.month}/${date.year}`;
  }
}

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styles: [`button.calendar, button.calendar:active {
    width: 2.75rem;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVEiJ7ZQxToVAEIY/YCHGxN6XGOIpnpaEsBSeQC9ArZbm9TZ6ADyBNzAhQGGl8Riv4BLAWAgmkpBYkH1b8FWT2WK/zJ8ZJ4qiI6XUI3ANnGKWBnht2/ZBDRK3hgVGNsCd7/ui+JkEIrKtqurLpEWaphd933+IyI3LEIdpCYCiKD6HcuOa/nwOa0ScJEnk0BJg0UTUWJRl6RxCYEzEmomsIlPU3IPW+grIAbquy+q6fluy/28RIBeRMwDXdXMgXLj/B2uimRXpui4D9sBeRLKl+1N+L+t6RwbWrZliTTTr1oxYtzVWiTQAcRxvTX+eJMnlUDaO1vpZRO5NS0x48sIwfPc87xg4B04MCzQi8hIEwe4bl1DnFMCN2zsAAAAASUVORK5CYII=') !important;
    background-repeat: no-repeat;
    background-size: 23px;
    background-position: center;
}
input.ng-invalid {
  border-color: pink;
 }
 input.ng-valid {
   background-color: lightgreen;
 }
`],
providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}] 
})
export class NgbdDatepickerPopup {
  new_today: NgbDate;
  new_year:NgbDate;
  @Input() parenteform:NgForm;
  @Input() formcontrolname:string;
  @Input() labelcontrol:string;
  constructor(calendar: NgbCalendar) {
    this.new_today = calendar.getToday();
    this.new_year = calendar.getNext(calendar.getToday(), 'y', -100);
  }
  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
}