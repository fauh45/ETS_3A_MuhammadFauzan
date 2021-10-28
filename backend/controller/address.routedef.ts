import { Type, Static } from "@sinclair/typebox";

/*
    Address Controller Route Definition

    Prefix "/address"
*/

export const Address = Type.Object({
  address_id: Type.Integer(),
  address: Type.String({ minLength: 0, maxLength: 50 }),
});
export type Address = Static<typeof Address>;

/* GET /?query=searchterm */
export const SearchAddressQueryString = Type.Object({
  query: Type.String({ maxLength: 25 }),
});
export type SearchAddressQueryString = Static<typeof SearchAddressQueryString>;

export const SearchAddressResponse = Type.Array(Address, {
  minItems: 0,
  maxItems: 5,
});
export type SearchAddressResponse = Static<typeof SearchAddressResponse>;
