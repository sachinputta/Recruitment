
// employee.ts
export interface Role {
  roleName: string;
}

export interface Employee {
  agreeToTerms: any;
  employeeId: string;
  fullName: string;
  employeeEmail: string;
  employeePassword: string;
   phoneNumber: number | null; 
  countrycode: string;
  imagePath: string;
  dateOfJoin: string; // 'YYYY-MM-DD'
  state: string;
  country: string;
  roles: Role[];
}
