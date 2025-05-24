import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerClientsPage } from './trainer-clients.page';

describe('TrainerClientsPage', () => {
  let component: TrainerClientsPage;
  let fixture: ComponentFixture<TrainerClientsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
