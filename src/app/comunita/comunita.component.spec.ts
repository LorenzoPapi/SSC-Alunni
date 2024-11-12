import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunitaComponent } from './comunita.component';

describe('ComunitaComponent', () => {
  let component: ComunitaComponent;
  let fixture: ComponentFixture<ComunitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
