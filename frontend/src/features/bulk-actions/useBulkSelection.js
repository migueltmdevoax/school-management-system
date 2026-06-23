import { useDispatch, useSelector } from "react-redux";
import { toggleSelection, clearSelection, selectAll } from "./bulkSelectionSlice";

const useBulkSelection = () => {
  const dispatch     = useDispatch();
  const selectedIds  = useSelector((s) => s.bulkSelection.selectedIds);
  const isSelected   = (id) => selectedIds.includes(id);
  const toggle       = (id) => dispatch(toggleSelection(id));
  const clear        = ()   => dispatch(clearSelection());
  const selectMany   = (ids) => dispatch(selectAll(ids));
  return { selectedIds, isSelected, toggle, clear, selectMany };
};

export default useBulkSelection;