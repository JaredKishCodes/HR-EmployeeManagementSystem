// Enums (you’d define them separately, similar to your C# enums)
enum LeaveType {
  Sick = "Sick",
  Vacation ="Vacation",
  Unpaid = "Unpaid",
  Other = "Other"
}

enum LeaveRequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected"
}


enum ApprovedBy {
   Pending = "Pending",
 Manager = "Manager",
 AssistantManager = "Assistant Manager",
 TeamLeader = "Team Leader",
}


export interface LeaveRequest {
  id: number;
  employeeId: number;
  leaveType: LeaveType;
  startDate: Date;
  endDate?: Date; 
  reason: string;
  leaveRequestStatus: LeaveRequestStatus;
  createdAt: Date;
  approvedBy: ApprovedBy;
}
