import { FastifyPluginAsync } from "fastify";
import {
  DeleteStaffError,
  DeleteStaffParams,
  GetAllStaffParams,
  GetAllStaffResponse,
  NewStaffBody,
  NewStaffResponse,
  UpdateStaffBody,
  UpdateStaffError,
  UpdateStaffParams,
  UpdateStaffResponse,
} from "./staff.routedef";

/*
    Staff Controller

    Prefix "/staff"
*/
const StaffController: FastifyPluginAsync = async (app, opts) => {
  app.get<{ Params: GetAllStaffParams; Reply: GetAllStaffResponse }>(
    "/:last_id",
    {
      schema: {
        description: "Get all staff (paginated)",
        tags: ["Staff"],
        params: GetAllStaffParams,
        response: {
          200: GetAllStaffResponse,
        },
      },
    },
    async (req, res) => {
      const response = await app.prisma.staff.findMany({
        take: 2,
        skip: req.params.last_id != undefined ? 1 : undefined,
        cursor:
          req.params.last_id != undefined
            ? { staff_id: req.params.last_id }
            : undefined,
        orderBy: {
          staff_id: "asc",
        },
      });

      const encoded_response = response.map((val) => {
        return { ...val, picture: val.picture?.toString("base64") || null };
      });

      return res.code(200).send({
        next:
          response.length >= 2 ? response[response.length - 1].staff_id : null,
        data: encoded_response,
      });
    }
  );

  app.post<{ Body: NewStaffBody; Reply: NewStaffResponse }>(
    "/",
    {
      schema: {
        description: "Add a new staff",
        tags: ["Staff"],
        body: NewStaffBody,
        response: {
          200: NewStaffResponse,
        },
      },
    },
    async (req, res) => {
      const { address_id, store_id, picture, ...rest } = req.body;

      const response = await app.prisma.staff.create({
        data: {
          ...rest,
          picture: picture ? Buffer.from(picture, "base64") : null,
          store_id: store_id,
          store: {
            connect: { store_id: store_id },
          },
          address: {
            connect: { address_id: address_id },
          },
        },
      });

      return res.code(200).send({
        ...response,
        picture: response.picture?.toString("base64") || null,
      });
    }
  );

  app.put<{
    Params: UpdateStaffParams;
    Body: UpdateStaffBody;
    Reply: UpdateStaffResponse | UpdateStaffError;
  }>(
    "/:staff_id",
    {
      schema: {
        description: "Update a new staff according to its staff id",
        tags: ["Staff"],
        params: UpdateStaffParams,
        body: UpdateStaffBody,
        response: {
          200: UpdateStaffResponse,
          404: UpdateStaffError,
        },
      },
    },
    async (req, res) => {
      try {
        const { store_id, address_id, picture, ...rest } = req.body;

        const response = await app.prisma.staff.update({
          where: {
            staff_id: req.params.staff_id,
          },
          data: {
            ...rest,
            store_id: store_id,
            picture: picture ? Buffer.from(picture, "base64") : undefined,
            address: {
              connect: {
                address_id: address_id,
              },
            },
            store: {
              connect: {
                store_id: store_id,
              },
            },
          },
        });

        return res.code(200).send({
          ...response,
          picture: response.picture?.toString("base64") || null,
        });
      } catch (err) {
        return res.code(404).send({ code: 404, message: "Not Found" });
      }
    }
  );

  app.delete<{
    Params: DeleteStaffParams;
    Reply: undefined | DeleteStaffError;
  }>(
    "/:staff_id",
    {
      schema: {
        description: "Delete a staff record by its id",
        tags: ["Staff"],
        params: DeleteStaffParams,
        response: {
          204: {},
          404: DeleteStaffError,
        },
      },
    },
    async (req, res) => {
      try {
        await app.prisma.staff.delete({
          where: {
            staff_id: req.params.staff_id,
          },
        });

        return res.code(204).send();
      } catch (err) {
        return res.code(404).send({ code: 404, message: "Not found" });
      }
    }
  );

  return;
};

export default StaffController;
