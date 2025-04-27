import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss',
      ]
})
export class WelcomepageComponent {
  title = 'Recruitment Agency';


  jobs: any[] = [];
  // filteredJobs: any[] = [];
  filteredJobs = this.jobs;
  designation = '';
  city = '';
  currentJobIndex = 0;
  jobsPerLoad = 3;

  
  minSalary: string = '';
  maxSalary: string = '';


  allJobs = [
    { title: 'AIX Admin', location: 'Mumbai', type: 'Full Time' },
    { title: 'Python Associate', location: 'Chennai', type: 'Part Time' },
    { title: 'Project Manager', location: 'Mumbai', type: 'Full Time' },
    { title: 'Oracle DB Admin', location: 'Thane', type: 'Full Time' },
    { title: 'Azure Engineer', location: 'Belapur', type: 'Contract' },
    { title: 'HR Executive', location: 'Chennai', type: 'Part Time' },
    { title: 'AIX Admin', location: 'Belapur', type: 'Full Time' },
    { title: 'Project Manager', location: 'Mumbai', type: 'Part Time' },
    { title: 'Python Associate', location: 'Thane', type: 'Full Time' },
    { title: 'Oracle DB Admin', location: 'Mumbai', type: 'Contract' },
  ];

  ngOnInit(): void {
    this.loadJobs();
  }

  // Filter and load jobs based on selected designation and city
  loadJobs(): void {
    let filtered = this.allJobs;

    if (this.designation) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(this.designation.toLowerCase())
      );
    }

    if (this.city) {
      filtered = filtered.filter((job) => job.location.toLowerCase() === this.city.toLowerCase());
    }

    this.filteredJobs = filtered;
    this.currentJobIndex = 0;
    this.showJobs();
  }

  // Show jobs by slicing the filtered job list based on the current index
  showJobs(): void {
    this.jobs = this.filteredJobs.slice(this.currentJobIndex, this.currentJobIndex + this.jobsPerLoad);
    this.currentJobIndex += this.jobsPerLoad;

    // Hide View More button if no more jobs to show
    if (this.currentJobIndex >= this.filteredJobs.length) {
      const viewMoreBtn = document.getElementById('viewMoreBtn');
      if (viewMoreBtn) {
        viewMoreBtn.style.display = 'none';
      }
    }
  }


  // Load more jobs when View More is clicked
  onViewMore(): void {
    this.showJobs();
  }
  


  // Handle filter change event
  onFilterChange(): void {
    // Add logic to handle filter changes, e.g., update results based on selections
    console.log('Filters changed:', {
      designation: this.designation,
      city: this.city,
      minSalary: this.minSalary,
      maxSalary: this.maxSalary
    });
  }

  // Handle search button click
  onSearch(): void {
    // Add logic to perform search based on filter values
    console.log('Search triggered:', {
      designation: this.designation,
      city: this.city,
      minSalary: this.minSalary,
      maxSalary: this.maxSalary
    });
  }
}
