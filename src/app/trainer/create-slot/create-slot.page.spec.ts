import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSlotPage } from './create-slot.page';

describe('CreateSlotPage', () => {
  let component: CreateSlotPage;
  let fixture: ComponentFixture<CreateSlotPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
