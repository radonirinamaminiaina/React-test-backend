import { Injectable } from '@nestjs/common';

export interface Employee {
  id: number;
  firstName: string;
  surname: string;
  email: string;
  birthDate: string;
  jobTitle: string;
  status: string;
}

@Injectable()
export class AppService {
  employees: Employee[] = [
    {
      id: 1,
      firstName: 'Abe',
      surname: 'Simpson',
      email: 'abe.simpson@springfield.com',
      birthDate: '1907-05-25',
      jobTitle: 'Work grouch',
      status: 'ACTIVE',
    },
    {
      id: 2,
      firstName: 'John',
      surname: 'Doe',
      email: 'john.doe@dummy.com',
      birthDate: '1945-05-25',
      jobTitle: 'Front',
      status: 'TERMINATED',
    },
    {
      id: 3,
      firstName: 'Jane',
      surname: 'Doe',
      email: 'jane.doe@dummy.com',
      birthDate: '1945-05-25',
      jobTitle: 'Front',
      status: 'TERMINATED',
    },
  ];

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee = {
      id: this.employees.length + 1,
      ...employee,
    };
    this.employees = [...this.employees, newEmployee];
    return newEmployee;
  }

  findOne(id: string) {
    return this.employees.find((employee) => employee.id === +id);
  }

  findAllEmployee(search: string): Employee[] {
    if (!search) {
      return this.employees;
    }
    const keywordRegex = new RegExp(search, 'gmi');
    return this.employees.filter((d: Employee) => {
      const keys = Object.keys(d);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return keys.find((k: string) => keywordRegex.test(d[k]));
    });
  }

  deleteEmployee(id: number): Employee[] {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }

  updateEmployee(id: number, newEmployee: Omit<Employee, 'id'>): Employee[] {
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        return {
          id,
          ...newEmployee,
        };
      }
      return employee;
    });

    return this.employees;
  }
}
