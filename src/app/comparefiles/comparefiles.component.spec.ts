import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparefilesComponent } from './comparefiles.component';

describe('ComparefilesComponent', () => {
  let component: ComparefilesComponent;
  let fixture: ComponentFixture<ComparefilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparefilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
