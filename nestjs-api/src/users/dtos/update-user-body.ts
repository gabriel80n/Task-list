/* eslint-disable prettier/prettier */

import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user-body";

export class UpdateUserDto extends PartialType(CreateUserDto) {}