import * as moment from 'moment';

const now = moment().toDate();
const inOneMonth = moment()
  .add(1, 'M')
  .toDate();

export class Banner {
  constructor(
    public path: string = '',
    public begin: any = now,
    public end: any = inOneMonth,
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
