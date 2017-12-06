import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import * as path from 'path';

describe('Banner Handler App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.setStorage('testEnv', '');
  });

  it('should display login page if unauthenticated', () => {

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

describe('Banner Handler App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    page.setStorage('testEnv', 'true');
  });

  it('should evade login page with if test env is specified and display banners', () => {

  	const authComponent = page.select('app-login');
  	const bannerComponent = page.select('app-banner');

  	expect(authComponent.isPresent()).toBeFalsy();
  	expect(bannerComponent.isPresent()).toBeTruthy();
  });

  it("should display form when clicking on add banner button", () => {

    const formClass = '.banner-form-card';
    const btnClass = '.add-banner-floating-btn';

    let form = page.select(formClass);
    expect(form.getCssValue('visibility')).toBe('hidden');

    page.select(btnClass).click();

    form = page.select(formClass);
    expect(form.getCssValue('visibility')).toBe('visible');
  });

  it("should pre-upload a picture and display it in preview in form", () => {

    const previewClass = '.img-container';

    // First we show the banner form
    const btnShowFormClass = '.add-banner-floating-btn';
    page.select(btnShowFormClass).click();

    // We expect no preview
    expect(page.select(previewClass).getCssValue('background-image')).toBe('none');

    // Then we emulate picture upload
    const fileToUpload = '../src/assets/test/test.jpg';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    page.select('.upload-btn').sendKeys(absolutePath);
    page.select('.upload-btn').click();

    // Then we check the preview
    setTimeout(() => {
      expect(page.select(previewClass).getCssValue('background-image').toBe('none');
    }, 5000);
  });
});
