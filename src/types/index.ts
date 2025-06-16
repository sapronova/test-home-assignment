export const employeeStatuses = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'] as const
export type EmployeeStatus = (typeof employeeStatuses)[number]

export interface Employee {
  id: number
  name: string
  status: EmployeeStatus
  img: string
}
