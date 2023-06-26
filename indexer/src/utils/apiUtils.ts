import { prisma } from "../db"
import axios from "axios";
export const callApi = async (endpoint: string, data: any, isDead = false) => {
  try {
    await axios.post(`${process.env.API_ENDPOINT}${endpoint}`, data);
    console.log("callapi success");
  } catch (error) {
    // TODO: if bad request save event en dead events queue
    console.log(
      "TENEMOS UN EVENTO MUERTO!!!!!!! -------_______---_______---___--___--__-_-_-__-"
    );
    if (isDead) return;
    await prisma.dead_events_queue.create({
      data: {
        eventName: endpoint,
        data: JSON.stringify(data),
      },
    });
    console.log("EVENTO MUERTO CREADO");
    console.log(error);
  }
};

module.exports = callApi;