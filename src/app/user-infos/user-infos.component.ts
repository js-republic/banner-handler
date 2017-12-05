import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {
  @Input() username: string;
  @Input() imgURL: string;

  constructor() {
  }

  ngOnInit() {
  }

}
