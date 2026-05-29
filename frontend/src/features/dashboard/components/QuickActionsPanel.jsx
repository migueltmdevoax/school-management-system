import QuickActionButton
from "./QuickActionButton";

import {
  useDispatch,
} from "react-redux";

import {
  openModal,
} from "../../modal/modalSlice";

import {
  openSlideOver,
} from "../../slide-over/slideOverSlice";

export default function QuickActionsPanel() {

  const dispatch =
    useDispatch();





  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/70
      backdrop-blur-xl
      p-6
      shadow-2xl
    ">

      <div className="
        mb-6
      ">

        <h2 className="
          text-2xl
          font-black
          text-white
        ">

          Quick Actions

        </h2>





        <p className="
          mt-2
          text-gray-400
        ">

          Common admin operations

        </p>

      </div>





      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">

        {/* CREATE STUDENT */}
        <QuickActionButton

          icon="👨‍🎓"

          title="Create Student"

          description="
            Register new student
          "

          onClick={() =>

            dispatch(

              openModal({

                component:
                  "CREATE_STUDENT",

              })

            )

          }

        />





        {/* CREATE INCIDENT */}
        <QuickActionButton

          icon="🚨"

          title="Register Incident"

          description="
            Create new incident report
          "

          onClick={() =>

            dispatch(

              openModal({

                component:
                  "CREATE_INCIDENT",

              })

            )

          }

        />





        {/* CREATE PAYMENT */}
        <QuickActionButton

          icon="💰"

          title="Create Payment"

          description="
            Register pending payment
          "

          onClick={() =>

            dispatch(

              openModal({

                component:
                  "CREATE_PAYMENT",

              })

            )

          }

        />





        {/* OPEN METRICS */}
        <QuickActionButton

          icon="📊"

          title="Student Metrics"

          description="
            Open analytics workspace
          "

          onClick={() =>

            dispatch(

              openSlideOver({

                component:
                  "STUDENT_METRICS",

                entityId:
                  null,

              })

            )

          }

        />

      </div>

    </div>

  );

}