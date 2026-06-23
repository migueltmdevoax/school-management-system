import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleCommandPalette } from "../command-palette/commandPaletteSlice";
import { closeSlideOver } from "../slide-over/slideOverSlice";
import { closeModal } from "../modal/modalSlice";
import { toggleGlobalSearch } from "../global-search/globalSearchSlice";

const useKeyboardShortcuts = () => {
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const sequenceRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(toggleCommandPalette());
      }

      if (key === "f" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        dispatch(toggleGlobalSearch());
      }

      if (key === "escape") {
        dispatch(closeSlideOver());
        dispatch(closeModal());
      }

      sequenceRef.current.push(key);
      if (sequenceRef.current.length > 2) sequenceRef.current.shift();
      const seq = sequenceRef.current.join("+");

      if (seq === "g+s") navigate("/app/students");
      if (seq === "g+d") navigate("/app/admin/dashboard");
      if (seq === "g+t") navigate("/app/teachers");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, navigate]);
};

export default useKeyboardShortcuts;