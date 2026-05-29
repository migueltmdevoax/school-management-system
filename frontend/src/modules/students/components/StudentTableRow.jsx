import {
  useDispatch,
} from "react-redux";

import ActionMenu
from "../../../features/action-menu/components/ActionMenu";

import ActionMenuItem
from "../../../features/action-menu/components/ActionMenuItem";

import ActionMenuDivider
from "../../../features/action-menu/components/ActionMenuDivider";

import BulkCheckbox
from "../../../features/bulk-actions/BulkCheckbox";

import useBulkSelection
from "../../../features/bulk-actions/useBulkSelection";

import {
  openSlideOver,
} from "../../../features/slide-over/slideOverSlice";

import StatusBadge
from "../../../features/status/components/StatusBadge";

import SyncBadge
from "../../../features/status/components/SyncBadge";

import HealthIndicator
from "../../../features/status/components/HealthIndicator";

export default function StudentTableRow({

  student,

}) {

  const dispatch =
    useDispatch();




  const {

    isSelected,

    toggle,

  } =
    useBulkSelection();




  /*
  |--------------------------------------------------------------------------
  | 🟣 OPEN PROFILE
  |--------------------------------------------------------------------------
  */

  const handleOpenProfile =
    () => {

      dispatch(

        openSlideOver({

          component:
            "student-profile",

          entityId:
            student.id,

        })

      );

    };


    const metrics =
  student.metrics || {};



  return (

    <tr
      className="
        border-b
        border-gray-800
        transition-all
        hover:bg-gray-900
      "
    >




      {/* ===================================================== */}
      {/* 🔥 BULK SELECT */}
      {/* ===================================================== */}

      <td className="p-4">

        <BulkCheckbox

          checked={
            isSelected(student.id)
          }

          onChange={() =>
            toggle(student.id)
          }

        />

      </td>





      {/* ===================================================== */}
      {/* 🔥 NAME */}
      {/* ===================================================== */}

      <td
        className="
          cursor-pointer
          p-4
          font-medium
          text-white
          hover:text-blue-400
        "

        onClick={
          handleOpenProfile
        }
      >

        {student.first_name}

      </td>





      {/* ===================================================== */}
      {/* 🔥 LAST NAME */}
      {/* ===================================================== */}

      <td className="p-4 text-gray-300">

        {student.last_name}

      </td>





      {/* ===================================================== */}
      {/* 🔥 EMAIL */}
      {/* ===================================================== */}

      <td className="p-4 text-gray-400">

        {student.email}

      </td>

      <td className="
  p-4
">

  <StatusBadge
    status={metrics.risk}
  />

</td>





<td className="
  p-4
">

  <HealthIndicator

    incidents={
      metrics.incidents
    }

    pendingPayments={
      metrics.pendingPayments
    }

  />

</td>





<td className="
  p-4
">

  <SyncBadge
    status={student.status}
  />

</td>





      {/* ===================================================== */}
      {/* 🔥 ACTIONS */}
      {/* ===================================================== */}

      <td className="p-4">

        <ActionMenu>





          <ActionMenuItem>

            ✏️ Editar

          </ActionMenuItem>





          <ActionMenuItem
            onClick={
              handleOpenProfile
            }
          >

            📊 Ver métricas

          </ActionMenuItem>





          <ActionMenuItem>

            💰 Ver pagos

          </ActionMenuItem>





          <ActionMenuDivider />





          <ActionMenuItem
            danger
          >

            🗑 Eliminar

          </ActionMenuItem>

        </ActionMenu>

      </td>

    </tr>
  );
}