import {ComponentFixture, TestBed} from '@angular/core/testing';
import {instance, mock, when} from 'ts-mockito';
import {AuthService} from '../auth/auth.service';
import {UserInfosComponent} from './user-infos.component';
import {of} from 'rxjs/observable/of';
import {User} from '../auth/user';
import {By} from '@angular/platform-browser';

describe('UserInfos', () => {

  let component: UserInfosComponent;
  let mockedAuthService: AuthService;
  let fixture: ComponentFixture<UserInfosComponent>;

  async function configureTestingModule(): Promise<any> {
    await TestBed.configureTestingModule({
      declarations: [UserInfosComponent],
      providers: [{
        provide: AuthService,
        useFactory: () => instance(mockedAuthService)
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(() => {
    mockedAuthService = mock(AuthService);
  });


  it('should display user information', async () => {
    // given
    when(mockedAuthService.user).thenReturn(of(new User('1', 'Mathieu', '/avatar.png')));
    await configureTestingModule();

    // then
    const displayedUsername = fixture.debugElement.query(By.css('figcaption')).nativeElement.innerHTML;
    const displayedImg = fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src');

    expect(displayedUsername).toEqual('Mathieu');
    expect(displayedImg).toEqual('/avatar.png');
  });

  it('should not display user information', async () => {
    // given
    when(mockedAuthService.user).thenReturn(of(null));
    await configureTestingModule();

    // then
    const nbUsernameDisplayed = fixture.debugElement.queryAll(By.css('figcaption')).length;
    const nbDisplayImg = fixture.debugElement.queryAll(By.css('img')).length;

    expect(nbUsernameDisplayed).toEqual(0);
    expect(nbDisplayImg).toEqual(0);
  });
});
