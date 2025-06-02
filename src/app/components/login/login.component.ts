import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { EmployeeService } from 'src/app/employee.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  loginError = '';
   employeeId = '';
  employeePassword = '';

  constructor(private employeeService: EmployeeService,
     private authService: AuthService, private router: Router) { }


    onLogin(): void {
    this.isLoading = true;

    this.authService.login(this.employeeId, this.employeePassword).subscribe({
      next: (res) => {
        this.authService.storeToken(res.jwtToken);


        // Store the employeeId in localStorage
        const employeeId = res.employee.employeeId; 
        sessionStorage.setItem('employeeId', employeeId);

        const role = res.employee.roles[0].roleName;
        sessionStorage.setItem('role', role);

        this.loginError = '';
        this.isLoading = false;

        if (role === 'Admin') {
          this.router.navigate(['/admin-homepage']);
        } else if (role === 'Employee') {
          this.router.navigate(['/employee-homepage']);
        } else {
          this.router.navigate(['/unauthorized']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.loginError = 'Invalid username or password';
        } else if (err.status === 403) {
          this.loginError = 'Your account is disabled. Contact admin.';
        } else {
          this.loginError = 'Something went wrong. Try again later.';
        }
      }
    });
  }
}
