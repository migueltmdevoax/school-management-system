import { useDispatch } from "react-redux";
import { openSlideOver, closeSlideOver } from "../features/slide-over/slideOverSlice";

export const useSlideOver = () => {
  const dispatch = useDispatch();

  const open = ({ type, entityId = null, props = null }) => {
    dispatch(openSlideOver({ type, entityId, props }));
  };

  const close = () => dispatch(closeSlideOver());

  return { open, close };
};