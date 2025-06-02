import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent {
  job = {
    jobName: '',
    jobLocation: '',
    employmentType: '',
    jobDescription: '',
    skillsRequired: '',
    jobCreatedBy: '',
    numberOfPositions: null,
    companyName: '',
    companyAddress: '',
    annualPackage: '',
    companyUrl: ''
  };



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  const creatorId = sessionStorage.getItem('employeeId'); // or whatever key you stored it under
  if (creatorId) {
    this.job.jobCreatedBy = creatorId;
  }
}


  submitJob() {
    this.http.post('http://localhost:8080/admin/post-job', this.job).subscribe({
      next: (response) => {
        console.log('Job posted successfully', response);
        alert('Job posted successfully!');
        // Reset form
        this.job = {
          jobName: '',
          jobLocation: '',
          employmentType: '',
          jobDescription: '',
          skillsRequired: '',
          jobCreatedBy: '',
          numberOfPositions: null,
          companyName: '',
          companyAddress: '',
          annualPackage: '',
          companyUrl: ''
        };
      },
      error: (error) => {
        console.error('Error posting job', error);
        alert('Failed to post job. Please try again.');
      }
    });
  }
}
