import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuletteComponent } from './aulette.component';

describe('AuletteComponent', () => {
  let component: AuletteComponent;
  let fixture: ComponentFixture<AuletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
