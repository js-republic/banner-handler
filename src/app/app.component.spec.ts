import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

import {
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';

const imports = [
  MatToolbarModule,
  RouterTestingModule
];

const declarations = [
  AppComponent
];

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports,
      declarations,
    }).compileComponents();
  }));

  it('should create the app', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    const selectorText = compiled.querySelector('mat-toolbar span').textContent;

    expect(selectorText).toContain("Gestionnaire de bannière d'Email");
  }));
});
