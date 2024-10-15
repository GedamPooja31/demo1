import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should return 0 for an empty string', () => {
    expect(app.add("")).toEqual(0);
  });

  it('should return 1 when the input is "1"', () => {
    expect(app.add("1")).toEqual(1);
  });

  it('should return 6 when the input is "1,5"', () => {
    expect(app.add("1,5")).toEqual(6);
  });

  it('should return 6 when the input is "1\n2,3"', () => {
    expect(app.add("1\n2,3")).toEqual(6);
  });

  it('should handle custom delimiters like "//;\n1;2"', () => {
    expect(app.add("//;\n1;2")).toEqual(3);
  });

  it('should throw an error when negative numbers are passed', () => {
    expect(() => app.add("1,-2,3")).toThrowError('Negative numbers not allowed: -2');
  });

  it('should handle custom delimiters of multiple characters like "//*\n1**2**3"', () => {
    expect(app.add("//*\n1**2**3")).toEqual(6);
  });
});