import { Static, Type } from "@sinclair/typebox";

/*
    Common Route Definition

    Prefix "*"
*/

/* Common Error Message */
export const ErrorMessage = Type.Object({
  code: Type.Number(),
  message: Type.String(),
});
export type ErrorMessage = Static<typeof ErrorMessage>;

