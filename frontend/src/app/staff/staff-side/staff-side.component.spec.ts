import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSideComponent } from './staff-side.component';

describe('StaffSideComponent', () => {
  let component: StaffSideComponent;
  let fixture: ComponentFixture<StaffSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
