import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleCommandPalette } from "../features/command-palette/commandPaletteSlice";

const useCommandPalette = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(toggleCommandPalette());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
};

export default useCommandPalette;