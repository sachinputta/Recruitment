import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/app/Modals/employee';
declare var bootstrap: any; // Import bootstrap to Angular scope if needed
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  employee: Employee = {
    employeeId: '',
    fullName: '',
    employeeEmail: '',
    employeePassword: '',
    phoneNumber: null,
    imagePath: '',
     dateOfJoin: new Date().toISOString().slice(0, 10),
    state: '',
    countrycode: '+91',
    country: '',
    roles: [],
    agreeToTerms: undefined
  };
  selectedRole: any;


  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    const termsModalEl = document.getElementById('termsModal');
    if (termsModalEl) {
      new bootstrap.Modal(termsModalEl); 
    }
  }
  
generateEmployeeId(): void {
  if (this.employee.employeeEmail) {
    this.employee.employeeId = this.employee.employeeEmail;
  } else {
    this.employee.employeeId = '';
  }
}

  onSignup(): void {
    if (!this.employee.agreeToTerms) {
      alert('Please agree to terms and conditions.');
      return;
    }
  

  const employeeData = {
    ...this.employee,
    roles: [{ roleName: this.selectedRole }]
  };

  this.employeeService.addEmployee(employeeData).subscribe({
    next: (res) => {
      console.log('Employee added successfully:', res);
      alert('Employee added successfully!');
      this.router.navigate(['/login']); 
    },
    error: (err) => {
      console.error('Error adding employee:', err);
      alert('Failed to add employee. Please try again.');
    }
  });
}

  onlyNumberKey(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  
  
}
