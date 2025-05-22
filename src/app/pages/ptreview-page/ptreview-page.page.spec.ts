import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PtreviewPagePage } from './ptreview-page.page';

describe('PtreviewPagePage', () => {
  let component: PtreviewPagePage;
  let fixture: ComponentFixture<PtreviewPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PtreviewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
