import { useSlideOver } from "../../hooks/useSlideOver";

const SlideOverBackdrop = () => {
  const { close } = useSlideOver();

  return (
    <div
      onClick={close}
      className="
        fixed
        inset-0
        z-40
        bg-black/40
        backdrop-blur-sm
      "
    />
  );
};

export default SlideOverBackdrop;