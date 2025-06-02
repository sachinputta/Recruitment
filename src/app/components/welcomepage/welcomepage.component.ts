import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Job } from 'src/app/Modals/job';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrls: ['./welcomepage.component.scss',
  ]
})
export class WelcomepageComponent {

  title = 'Recruitment Agency';
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  currentJobIndex = 0;
  jobsPerLoad = 3;

  designation = '';
  city = '';
  employmentType: string = '';


  minSalary: string = '';
  maxSalary: string = '';

  allJobs: Job[] = [];
  paginatedJobs: Job[] = [];

  page: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;


  maxVisiblePages = 3;
  visiblePageStart = 1;
  visiblePageEnd = this.maxVisiblePages;


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadAllJobs();
  }



  loadAllJobs(): void {
    this.employeeService.getAllJobs().subscribe((jobs) => {
      this.allJobs = jobs;
      this.filteredJobs = []; // Reset filters
      this.totalPages = Math.ceil(this.allJobs.length / this.pageSize);
      this.updateVisiblePages();
      this.setPage(this.page);
    });
  }


  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;

    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const sourceJobs = this.filteredJobs.length ? this.filteredJobs : this.allJobs;
    this.paginatedJobs = sourceJobs.slice(start, end);
    this.updateVisiblePages();
  }



  updateVisiblePages(): void {
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = this.page - half;
    let end = this.page + half;

    if (start < 1) {
      start = 1;
      end = Math.min(this.maxVisiblePages, this.totalPages);
    } else if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    this.visiblePageStart = start;
    this.visiblePageEnd = end;
  }

  get pages(): number[] {
    const pages = [];
    for (let i = this.visiblePageStart; i <= this.visiblePageEnd; i++) {
      pages.push(i);
    }
    return pages;
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

  onSearch(): void {
    this.filteredJobs = this.allJobs.filter((job) => {
      const matchesDesignation = this.designation
        ? job.jobName.toLowerCase().includes(this.designation.toLowerCase())
        : true;

      const matchesCity = this.city
        ? job.jobLocation.toLowerCase() === this.city.toLowerCase()
        : true;

      const matchesEmploymentType = this.employmentType
        ? job.employmentType.toLowerCase() === this.employmentType.toLowerCase()
        : true;

      return matchesDesignation && matchesCity && matchesEmploymentType;
    });

    this.totalPages = Math.ceil(this.filteredJobs.length / this.pageSize);
    this.page = 1;
    this.setPage(this.page);
  }

}
