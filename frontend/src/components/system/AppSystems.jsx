import { useSelector }          from "react-redux";
import GlobalToast              from "../ui/toast/GlobalToast";
import GlobalLoader             from "../../features/loading/components/GlobalLoader";
import GlobalModal              from "../../features/modal/components/GlobalModal";
import GlobalSlideOver          from "../../features/slide-over/GlobalSlideOver";
import CommandPalette           from "../../features/command-palette/CommandPalette";
import useCommandPalette        from "../../hooks/useCommandPalette";
import KeyboardShortcutProvider from "../../features/keyboard-shortcuts/KeyboardShortcutProvider";
import GlobalSearchModal        from "../../features/search/components/GlobalSearchModal";
import GlobalSearchProvider     from "../../features/global-search/components/GlobalSearchProvider";
import NotificationsCenter      from "../../features/notifications-center/components/NotificationsCenter";

const AppSystems = () => {
  // 🔥 Solo activa los sistemas que requieren auth cuando el usuario está autenticado
  const { isAuthenticated } = useSelector((s) => s.auth);
  useCommandPalette();

  return (
    <>
      {/* Siempre activos */}
      <GlobalToast />
      <GlobalLoader />

      {/* Solo cuando está autenticado */}
      {isAuthenticated && (
        <>
          <KeyboardShortcutProvider />
          <GlobalSlideOver />
          <GlobalModal />
          <GlobalSearchModal />
          <GlobalSearchProvider />
          <NotificationsCenter />
          <CommandPalette />
        </>
      )}
    </>
  );
};

export default AppSystems;