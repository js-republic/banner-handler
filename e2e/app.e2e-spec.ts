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

  xit('should display login page if unauthenticated', () => {

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

    // First form should be hidden
    let form = page.select(formClass);
    expect(form.getCssValue('visibility')).toBe('hidden');

    page.select(btnClass).click();

    // After click form should be visible
    form = page.select(formClass);
    expect(form.getCssValue('visibility')).toBe('visible');
  });

  it("should pre-upload a picture and display it in preview in form", (done) => {

    const previewClass = '.img-container';

    // First we show the banner form
    const btnShowFormClass = '.add-banner-floating-btn';
    page.select(btnShowFormClass).click();

    // We expect no preview
    expect(page.select(previewClass).getCssValue('background-image')).toBe('none');

    // Then we emulate picture upload
    const fileToUpload = '../src/assets/test/test.jpg';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    page.select('.upload-btn input').sendKeys(absolutePath);
    page.select('.upload-btn input').click();

    // Then we check the preview
    // We have to wait because reader.onload function is async
    setTimeout(() => {
      expect(page.select(previewClass).getCssValue('background-image')).toContain('url("data:image/jpeg;base64,');
      done();
    }, 2000);
  });
});
