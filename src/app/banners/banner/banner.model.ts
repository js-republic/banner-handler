import * as moment from 'moment';

const now: Date = moment().toDate();
const inOneMonth: Date = moment()
  .add(1, 'M')
  .toDate();

export class Banner {
  constructor(
    public path: string = '',
    public begin: Date = now,
    public end: Date = inOneMonth,
    public id: string = '',
    public companies: Companies = { js: true, ux: true, iot: true },
    public isDefault: boolean = false
  ) {}
}

export interface Companies {
  js: boolean;
  ux: boolean;
  iot: boolean;
}
