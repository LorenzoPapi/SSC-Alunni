import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavatriceComponent } from './lavatrice.component';

describe('LavatriceComponent', () => {
  let component: LavatriceComponent;
  let fixture: ComponentFixture<LavatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LavatriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
