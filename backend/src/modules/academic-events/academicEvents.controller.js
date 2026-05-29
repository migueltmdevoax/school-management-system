import {

  getAcademicEvents,

  createAcademicEvent,

} from "./academicEvents.service.js";

export const
getAcademicEventsController =
async (req, res) => {

  try {

    const events =
      await getAcademicEvents();



    return res.status(200)
      .json({

        success: true,

        data:
          events,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get events",

      });

  }

};





export const
createAcademicEventController =
async (req, res) => {

  try {

    const event =
      await createAcademicEvent(
        req.body
      );



    return res.status(201)
      .json({

        success: true,

        data:
          event,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to create event",

      });

  }

};