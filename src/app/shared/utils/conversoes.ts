import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

@Injectable()
export class Conversoes {

  dateParser(dateStr: any) {
    let newDate = new Date(dateStr[0], dateStr[1] - 1, dateStr[2], dateStr[3], dateStr[4])
    return newDate
  }
}
