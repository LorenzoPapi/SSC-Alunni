import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllieviComponent } from './allievi.component';

describe('AllieviComponent', () => {
  let component: AllieviComponent;
  let fixture: ComponentFixture<AllieviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllieviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllieviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
