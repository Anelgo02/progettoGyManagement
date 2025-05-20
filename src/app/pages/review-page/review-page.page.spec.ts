import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPagePage } from './review-page.page';

describe('ReviewPagePage', () => {
  let component: ReviewPagePage;
  let fixture: ComponentFixture<ReviewPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
