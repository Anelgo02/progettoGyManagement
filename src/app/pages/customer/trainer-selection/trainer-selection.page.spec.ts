import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerSelectionPage } from './trainer-selection.page';

describe('TrainerSelectionPage', () => {
  let component: TrainerSelectionPage;
  let fixture: ComponentFixture<TrainerSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
