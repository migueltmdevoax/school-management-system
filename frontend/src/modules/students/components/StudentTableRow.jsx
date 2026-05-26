import ActionMenu
from "../../../features/action-menu/components/ActionMenu";

import ActionMenuItem
from "../../../features/action-menu/components/ActionMenuItem";

import ActionMenuDivider
from "../../../features/action-menu/components/ActionMenuDivider";



export default function StudentTableRow({

  student,

}) {

  return (

    <tr className="
      border-b
      border-gray-800
      hover:bg-gray-900
      transition-all
    ">

      {/* 🔥 NAME */}
      <td className="
        p-4
        text-white
      ">

        {student.first_name}
      </td>





      {/* 🔥 LAST NAME */}
      <td className="
        p-4
        text-gray-300
      ">

        {student.last_name}
      </td>





      {/* 🔥 EMAIL */}
      <td className="
        p-4
        text-gray-400
      ">

        {student.email}
      </td>





      {/* 🔥 ACTIONS */}
      <td className="
        p-4
      ">

        <ActionMenu>

          <ActionMenuItem>

            ✏️ Editar

          </ActionMenuItem>





          <ActionMenuItem>

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