import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPersonalTrainerPage } from './dashboard-personal-trainer.page';

describe('DashboardPersonalTrainerPage', () => {
  let component: DashboardPersonalTrainerPage;
  let fixture: ComponentFixture<DashboardPersonalTrainerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonalTrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
