import { FastifyPluginAsync } from "fastify";
import {
  SearchAddressQueryString,
  SearchAddressResponse,
} from "./address.routedef";

/*
    Address Controller Route Definition

    Prefix "/address"
*/
const AddressController: FastifyPluginAsync = async (app, opts) => {
  app.get<{
    Querystring: SearchAddressQueryString;
    Reply: SearchAddressResponse;
  }>(
    "/",
    {
      schema: {
        description: "Search up address by its address",
        tags: ["Address"],
        querystring: SearchAddressQueryString,
        response: {
          200: SearchAddressResponse,
        },
      },
    },
    async (req, res) => {
      const response = await app.prisma.address.findMany({
        take: 5,
        where: {
          OR: [
            {
              address: {
                startsWith: req.query.query,
              },
            },
            {
              address: {
                contains: req.query.query,
              },
            },
          ],
        },
      });

      return res.code(200).send(response);
    }
  );

  return;
};

export default AddressController;
