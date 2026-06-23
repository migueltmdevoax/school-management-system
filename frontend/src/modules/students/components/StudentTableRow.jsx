import { useDispatch }          from "react-redux";
import ActionMenu               from "../../../features/action-menu/components/ActionMenu";
import ActionMenuItem           from "../../../features/action-menu/components/ActionMenuItem";
import ActionMenuDivider        from "../../../features/action-menu/components/ActionMenuDivider";
import BulkCheckbox             from "../../../features/bulk-actions/BulkCheckbox";
import useBulkSelection         from "../../../features/bulk-actions/useBulkSelection";
import { openSlideOver }        from "../../../features/slide-over/slideOverSlice";
import { openModal }            from "../../../features/modal/modalSlice";
import StatusBadge              from "../../../features/status/components/StatusBadge";
import SyncBadge                from "../../../features/status/components/SyncBadge";
import HealthIndicator          from "../../../features/status/components/HealthIndicator";
import { useDeleteStudentMutation } from "../../../features/students/studentsApi";

export default function StudentTableRow({ student }) {
  const dispatch = useDispatch();
  const { isSelected, toggle } = useBulkSelection();
  const [deleteStudent] = useDeleteStudentMutation();
  const metrics = student.metrics || {};

  const handleOpenProfile = () => {
    dispatch(openSlideOver({ type: "student-profile", entityId: student.id }));
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete ${student.first_name} ${student.last_name}?`)) {
      await deleteStudent(student.id);
    }
  };

  const handleEdit = () => {
    dispatch(openModal({
      modalType:  "EDIT_STUDENT",
      modalProps: { student },
    }));
  };

  return (
    <tr className="border-b border-gray-800 transition-all hover:bg-gray-900">
      <td className="p-4">
        <BulkCheckbox checked={isSelected(student.id)} onChange={() => toggle(student.id)} />
      </td>
      <td className="cursor-pointer p-4 font-medium text-white hover:text-blue-400" onClick={handleOpenProfile}>
        {student.first_name}
      </td>
      <td className="p-4 text-gray-300">{student.last_name}</td>

      {/* 🔥 Nueva columna — Group + teacher */}
      <td className="p-4">
        {student.group_name ? (
          <div>
            <p className="text-white font-medium text-sm">{student.group_name}</p>
            {student.teacher_name && (
              <p className="text-gray-500 text-xs mt-0.5">👨‍🏫 {student.teacher_name}</p>
            )}
          </div>
        ) : (
          <span className="text-gray-600 text-sm italic">No group</span>
        )}
      </td>

      <td className="p-4 text-gray-400">{student.email}</td>
      <td className="p-4"><StatusBadge    status={metrics.risk} /></td>
      <td className="p-4"><HealthIndicator incidents={metrics.incidents} pendingPayments={metrics.pendingPayments} /></td>
      <td className="p-4"><SyncBadge      status={student.status} /></td>
      <td className="p-4">
        <ActionMenu>
          <ActionMenuItem onClick={handleOpenProfile}>📊 View profile</ActionMenuItem>
          <ActionMenuItem onClick={handleEdit}>✏️ Edit</ActionMenuItem>
          <ActionMenuDivider />
          <ActionMenuItem danger onClick={handleDelete}>🗑 Delete</ActionMenuItem>
        </ActionMenu>
      </td>
    </tr>
  );
}