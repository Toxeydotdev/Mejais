import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinStreaksSearchComponent } from './win-streaks-search.component';

describe('WinStreaksSearchComponent', () => {
  let component: WinStreaksSearchComponent;
  let fixture: ComponentFixture<WinStreaksSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinStreaksSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinStreaksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
