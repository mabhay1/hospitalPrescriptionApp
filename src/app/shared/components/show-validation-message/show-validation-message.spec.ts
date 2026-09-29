import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowValidationMessage } from './show-validation-message';

describe('ShowValidationMessage', () => {
  let component: ShowValidationMessage;
  let fixture: ComponentFixture<ShowValidationMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowValidationMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowValidationMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
