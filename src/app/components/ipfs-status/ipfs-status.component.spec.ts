import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpfsStatusComponent } from './ipfs-status.component';

describe('IpfsStatusComponent', () => {
  let component: IpfsStatusComponent;
  let fixture: ComponentFixture<IpfsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpfsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpfsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
