import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('bannerhandler App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.setStorage('testEnv', '');
  });

  it('should display login page', () => {

    const pageTitle = page.select('mat-toolbar span').getText();
    const authComponent = page.select('app-login');
    const authBtnText = page.select('app-login a span').getText();
    const bannerComponent = page.select('app-banner');

    expect(pageTitle).toEqual("Gestionnaire de bannière d'Email");

    expect(authComponent.isPresent()).toBeTruthy();
    expect(authBtnText).toEqual("Je m'authentifie avec Google");

    expect(bannerComponent.isPresent()).toBeFalsy();
  });
});

describe('bannerhandler', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.setStorage('testEnv', 'true');
  });

  it('should evade login page with test env', () => {

  	const authComponent = page.select('app-login');
  	const bannerComponent = page.select('app-banner');

  	expect(authComponent.isPresent()).toBeFalsy();
  	expect(bannerComponent.isPresent()).toBeTruthy();
  });
});
