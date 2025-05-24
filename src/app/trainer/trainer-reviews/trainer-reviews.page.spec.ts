import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerReviewsPage } from './trainer-reviews.page';

describe('TrainerReviewsPage', () => {
  let component: TrainerReviewsPage;
  let fixture: ComponentFixture<TrainerReviewsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerReviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
