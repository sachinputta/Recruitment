import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPostedJobsComponent } from './all-posted-jobs.component';

describe('AllPostedJobsComponent', () => {
  let component: AllPostedJobsComponent;
  let fixture: ComponentFixture<AllPostedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPostedJobsComponent]
    });
    fixture = TestBed.createComponent(AllPostedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
