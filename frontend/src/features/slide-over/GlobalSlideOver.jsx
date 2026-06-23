import { useSelector } from "react-redux";
import {
  selectIsSlideOverOpen,
  selectSlideOverType,
  selectSlideOverEntityId,
  selectSlideOverProps,
} from "./slideOverSelectors";
import { slideOverRegistry } from "./slideOverRegistry";
import SlideOverBackdrop from "../../components/slide-over/SlideOverBackdrop";

const GlobalSlideOver = () => {
  const isOpen   = useSelector(selectIsSlideOverOpen);
  const type     = useSelector(selectSlideOverType);
  const entityId = useSelector(selectSlideOverEntityId);
  const props    = useSelector(selectSlideOverProps);

  if (!isOpen || !type) return null;

  const Component = slideOverRegistry[type];
  if (!Component) return null;

  return (
    <>
      <SlideOverBackdrop />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl">
        <Component entityId={entityId} {...(props || {})} />
      </div>
    </>
  );
};

export default GlobalSlideOver;