export interface Payroll {
  id: number;
  employeeName: string;
  departmentName: string;
  basicSalary: number;
  allowance: number;
  deductions: number;
  totalSalary: number;
  payDate: Date; 
}
