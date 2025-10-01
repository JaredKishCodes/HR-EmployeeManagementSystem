import type { Department } from "./department";
import type { Position, Status } from "./enums";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: Position;
  hireDate: string; // ISO date string (from DateTime in C#)
  status: Status;
  departmentId: number;
  department?: Department; // nullable in C#
}

export interface EmployeeResponse{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  position: string;
  hireDate: string; // ISO date string (from DateTime in C#)
  status: string;
  departmentName: string;
}

 export interface EmployeeRequest{

      firstName:string,
      lastName :string,
      email:string,
      phoneNumber:number,
      position :string,
      status :string,
      hireDate:string,
      departmentId :number
 }
