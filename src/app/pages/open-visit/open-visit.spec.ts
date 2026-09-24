import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenVisit } from './open-visit';

describe('OpenVisit', () => {
  let component: OpenVisit;
  let fixture: ComponentFixture<OpenVisit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenVisit],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenVisit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
