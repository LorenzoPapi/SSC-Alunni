import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClpComponent } from './clp.component';

describe('ClpComponent', () => {
  let component: ClpComponent;
  let fixture: ComponentFixture<ClpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
