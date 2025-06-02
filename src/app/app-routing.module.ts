import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { RoleGuard } from './Guards/role.guard';
import { WelcomepageComponent } from './components/welcomepage/welcomepage.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { EmployeeHomepageComponent } from './components/employee-homepage/employee-homepage.component';
import { PostAJobComponent } from './components/post-a-job/post-a-job.component';
import { AllPostedJobsComponent } from './components/all-posted-jobs/all-posted-jobs.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'career', component: WelcomepageComponent },
  { path: 'apply-job', component: ApplyJobComponent },
  {
    path: 'admin-homepage',
    component: AdminHomepageComponent,
  },
  {
    path: 'employee-homepage',
    component: EmployeeHomepageComponent,
  },
  { path: 'postajob', component: PostAJobComponent },
   { path: 'allpostedjob', component: AllPostedJobsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/career', pathMatch: 'full' },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }