import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinStreaksComponent } from './win-streaks.component';

describe('WinStreaksComponent', () => {
  let component: WinStreaksComponent;
  let fixture: ComponentFixture<WinStreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinStreaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinStreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
