import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingPage } from './booking-page.page';

describe('BookingPagePage', () => {
  let component: BookingPage;
  let fixture: ComponentFixture<BookingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
