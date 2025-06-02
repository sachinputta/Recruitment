import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/Modals/job';

@Component({
  selector: 'app-all-posted-jobs',
  templateUrl: './all-posted-jobs.component.html',
  styleUrls: ['./all-posted-jobs.component.scss']
})
export class AllPostedJobsComponent {


  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.http.get<Job[]>('http://localhost:8080/view-all-jobs').subscribe({
      next: (data) => {
        this.jobs = data;
        this.filteredJobs = data;
      },
      error: (error) => {
        console.error('Error fetching jobs', error);
        alert('Failed to load jobs. Please try again.');
      },
    });
  }

  filterJobs(): void {
    if (this.searchTerm.trim()) {
      this.filteredJobs = this.jobs.filter((job) =>
        job.jobName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredJobs = this.jobs;
    }
  }

  viewJob(jobId: string): void {
    // Placeholder: Implement modal or navigation to view job details
    alert(`View job details for Job ID: ${jobId}`);
  }

  editJob(jobId: string): void {
    // Navigate to edit job route (assumes routing is set up)
    this.router.navigate(['/edit-job', jobId]);
  }

  deleteJob(jobId: string): void {
    if (confirm(`Are you sure you want to delete job ${jobId}?`)) {
      this.http.delete(`http://localhost:8080/admin/delete-job/${jobId}`).subscribe({
        next: () => {
          this.jobs = this.jobs.filter((job) => job.jobId !== jobId);
          this.filterJobs();
          alert('Job deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting job', error);
          alert('Failed to delete job. Please try again.');
        },
      });
    }
  }

}
