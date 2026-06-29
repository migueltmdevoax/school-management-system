import {
  useState
} from "react";

import {
  useDispatch
} from "react-redux";

import {
  useCreateIncidentMutation
} from "../../features/incidents/incidentsApi";

import {
  apiSlice
} from "../../app/api/apiSlice";

import {
  createOptimisticIncident
} from "../../utils/optimistic/createOptimisticIncident";

const CreateIncidentQuickAction = ({
  studentId,
}) => {

  const dispatch =
    useDispatch();

  const [
    createIncident,
  ] =
    useCreateIncidentMutation();

  const [
    loading,
    setLoading,
  ] = useState(false);




  const handleCreate =
    async () => {

      try {

        setLoading(true);




        /*
        |--------------------------------------------------------------------------
        | 🟣 OPTIMISTIC INCIDENT
        |--------------------------------------------------------------------------
        */

        const optimisticIncident =

          createOptimisticIncident({

            studentId,

            title:
              "Behavior incident",

            severity:
              "medium",

          });




        /*
        |--------------------------------------------------------------------------
        | 🟣 OPTIMISTIC ACTIVITY
        |--------------------------------------------------------------------------
        */

        dispatch(

          apiSlice.util
            .updateQueryData(

              "getActivityTimeline",

              {
                entityType:
                  "student",

                entityId:
                  studentId,
              },

              (draft) => {

                if (!draft?.data)
                  return;

                draft.data.unshift({

                  id:
                    optimisticIncident.id,

                  action:
                    "incident_created",

                  title:
                    "Incident registered",

                  description:
                    optimisticIncident.title,

                  created_at:
                    new Date().toISOString(),

                  optimistic:
                    true,

                });

              }

            )

        );




        /*
        |--------------------------------------------------------------------------
        | 🟣 REAL REQUEST
        |--------------------------------------------------------------------------
        */

        await createIncident({

          studentId,

          teacherId: 1,

          title:
            "Behavior incident",

          description:
            "Quick incident created from slide-over",

          severity:
            "medium",

        }).unwrap();

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };




  return (

    <button

      onClick={handleCreate}

      disabled={loading}

      className="
        rounded-xl
        border
        px-4
        py-2
        text-sm
        font-medium
        hover:bg-gray-100
      "
    >

      {loading
        ? "Creando..."
        : "Crear Incident"}

    </button>

  );

};

export default
CreateIncidentQuickAction;