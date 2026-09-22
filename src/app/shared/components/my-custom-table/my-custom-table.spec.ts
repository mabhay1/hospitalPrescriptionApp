import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCustomTable } from './my-custom-table';

describe('MyCustomTable', () => {
  let component: MyCustomTable;
  let fixture: ComponentFixture<MyCustomTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCustomTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MyCustomTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
