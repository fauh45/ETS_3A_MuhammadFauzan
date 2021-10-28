import { Static, Type } from "@sinclair/typebox";
import { ErrorMessage } from "./common.routedef";

/*
    Staff Controller Route Definition

    Prefix "/staff"
*/

export const Staff = Type.Object({
  staff_id: Type.Integer(),
  first_name: Type.String({ minLength: 1, maxLength: 45 }),
  last_name: Type.String({ minLength: 1, maxLength: 45 }),
  address_id: Type.Integer(),
  email: Type.Union([
    Type.String({ minLength: 1, maxLength: 50 }),
    Type.Null(),
  ]),
  store_id: Type.Integer(),
  active: Type.Boolean(),
  username: Type.String({ minLength: 1, maxLength: 16 }),
  password: Type.Union([
    Type.String({ minLength: 8, maxLength: 40 }),
    Type.Null(),
  ]),
  picture: Type.Union([Type.String(), Type.Null()]),
});
export type Staff = Static<typeof Staff>;

/* GET /:last_id */
export const GetAllStaffParams = Type.Object({
  last_id: Type.Union([Staff.properties.staff_id, Type.Null()]),
});

export type GetAllStaffParams = Static<typeof GetAllStaffParams>;

export const GetAllStaffResponse = Type.Object({
  next: Type.Union([Staff.properties.staff_id, Type.Null()]),
  data: Type.Array(
    Type.Intersect([Staff, Type.Object({ store_connected: Type.Boolean() })]),
    { minItems: 0 }
  ),
});
export type GetAllStaffResponse = Static<typeof GetAllStaffResponse>;

/* POST /  */
export const NewStaffBody = Type.Omit(Staff, ["staff_id"]);
export type NewStaffBody = Static<typeof NewStaffBody>;

export const NewStaffResponse = Staff;
export type NewStaffResponse = Staff;

/* PUT /:staff_id */
export const UpdateStaffParams = Type.Object({
  staff_id: Staff.properties.staff_id,
});
export type UpdateStaffParams = Static<typeof UpdateStaffParams>;

export const UpdateStaffBody = Type.Partial(Type.Omit(Staff, ["staff_id"]));
export type UpdateStaffBody = Static<typeof UpdateStaffBody>;

export const UpdateStaffResponse = Staff;
export type UpdateStaffResponse = Staff;

export const UpdateStaffError = ErrorMessage;
export type UpdateStaffError = ErrorMessage;

/* DELETE /:staff_id */
export const DeleteStaffParams = Type.Object({
  staff_id: Staff.properties.staff_id,
});
export type DeleteStaffParams = Static<typeof UpdateStaffParams>;

export const DeleteStaffError = ErrorMessage;
export type DeleteStaffError = ErrorMessage;
