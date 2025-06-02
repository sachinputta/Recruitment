import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAJobComponent } from './post-a-job.component';

describe('PostAJobComponent', () => {
  let component: PostAJobComponent;
  let fixture: ComponentFixture<PostAJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostAJobComponent]
    });
    fixture = TestBed.createComponent(PostAJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
