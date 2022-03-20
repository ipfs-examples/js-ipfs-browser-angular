import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitDbStatusComponent } from './orbit-db-status.component';

describe('OrbitDbStatusComponent', () => {
  let component: OrbitDbStatusComponent;
  let fixture: ComponentFixture<OrbitDbStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrbitDbStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitDbStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
