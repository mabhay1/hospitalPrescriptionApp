import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotAccess } from './not-access';

describe('NotAccess', () => {
  let component: NotAccess;
  let fixture: ComponentFixture<NotAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(NotAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
