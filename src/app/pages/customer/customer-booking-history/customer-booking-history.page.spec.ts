import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerBookingHistoryPage } from './customer-booking-history.page';

describe('CustomerBookingHistoryPage', () => {
  let component: CustomerBookingHistoryPage;
  let fixture: ComponentFixture<CustomerBookingHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBookingHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
