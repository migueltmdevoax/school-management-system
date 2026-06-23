import { useSelector, useDispatch } from "react-redux";
import { closeGlobalSearch } from "../globalSearchSlice";
import GlobalSearchModal from "./GlobalSearchModal";

export default function GlobalSearchProvider() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.globalSearch.open);
  if (!open) return null;
  return <GlobalSearchModal onClose={() => dispatch(closeGlobalSearch())} />;
}