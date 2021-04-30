import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionMainComponent } from './competition-main.component';

describe('CompetitionMainComponent', () => {
  let component: CompetitionMainComponent;
  let fixture: ComponentFixture<CompetitionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
