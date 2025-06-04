import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserprofilePagePage } from './userprofile-page.page';

describe('UserprofilePagePage', () => {
  let component: UserprofilePagePage;
  let fixture: ComponentFixture<UserprofilePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofilePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
