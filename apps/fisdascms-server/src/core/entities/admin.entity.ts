import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ErrorResponse } from '../dtos/response.dto';
import { HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = Admin & Document;

export enum AdminRole {
  Owner = 'owner',
  Admin = 'admin',
}

@Schema({ timestamps: true })
export class Admin {
  _id: string | number;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Exclude()
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  role: AdminRole;

  constructor(initialProps?: {
    _id?: string | number;
    name?: string;
    email?: string;
    password?: string;
    role?: AdminRole;
  }) {
    const { _id, name, email, password, role } = initialProps;
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  protected validateName() {
    if (!this.name) return { name: 'Nama harus diisi' };
    return true;
  }

  protected validateEmail() {
    const isEmailValid =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        this.email,
      );
    if (!isEmailValid) return { email: 'Email tidak valid' };
    return true;
  }

  protected validatePassword() {
    const minChar = 6;
    if (!(this.password.length >= minChar))
      return { password: `Password minimal ${minChar} karakter` };
    return true;
  }

  protected validateRole() {
    if (this.role !== AdminRole.Owner && this.role !== AdminRole.Admin)
      return { role: 'Role tidak valid' };
    return true;
  }

  validateProps() {
    const validationResults = [
      this.validateName(),
      this.validateEmail(),
      this.validatePassword(),
      this.validateRole(),
    ];
    const errors = validationResults.reduce(
      (error, result) =>
        typeof result !== 'boolean' ? { ...error, ...result } : error,
      {},
    );
    console.log('Validation errors :', errors);
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

  async verifyPassword(passwordToBeVerified: string) {
    return await bcrypt.compare(passwordToBeVerified, this.password);
  }
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
