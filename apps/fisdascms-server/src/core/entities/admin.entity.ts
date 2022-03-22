import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ErrorResponse } from '../dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export enum AdminRole {
  Owner = 'owner',
  Admin = 'admin',
}

export class Admin {
  name: string;

  email: string;

  @Exclude()
  password: string;

  role: AdminRole;

  constructor(initialProps?: {
    name?: string;
    email?: string;
    password?: string;
    role?: AdminRole;
  }) {
    const { name, email, password, role } = initialProps;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  protected validateName() {
    if (!this.name) return 'Nama harus diisi';
    return true;
  }

  protected validateEmail() {
    const isEmailValid =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        this.email,
      );
    if (!isEmailValid) return 'Email tidak valid';
    return true;
  }

  protected validatePassword() {
    const minChar = 6;
    if (!(this.password.length >= minChar))
      return `Password minimal ${minChar} karakter`;
    return true;
  }

  protected validateRole() {
    typeof this.role;
    if (this.role !== AdminRole.Owner && this.role !== AdminRole.Admin)
      return 'Role tidak valid';
    return true;
  }

  validateProps() {
    const errors = {};
    if (typeof this.validateName() === 'string')
      errors['name'] = this.validateName();
    if (typeof this.validateEmail() === 'string')
      errors['email'] = this.validateEmail();
    if (typeof this.validatePassword() === 'string')
      errors['password'] = this.validatePassword();
    if (typeof this.validateRole() === 'string')
      errors['role'] = this.validateRole();
    if (!(Object.keys(errors).length === 0 && errors.constructor === Object))
      throw new ErrorResponse('Data tidak valid', HttpStatus.BAD_REQUEST, {
        errors,
      });
    return errors;
  }

  async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
    return this.password;
  }
}
