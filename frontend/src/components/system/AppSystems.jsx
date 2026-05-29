import {
  useEffect,
} from "react";

import {
  useStore,
} from "react-redux";

import GlobalToast
from "../../features/toast/components/GlobalToast";

import GlobalLoader
from "../../features/loading/components/GlobalLoader";

import GlobalModal
from "../../features/modal/components/GlobalModal";

import GlobalSlideOver
from "../../features/slide-over/GlobalSlideOver";

import CommandPalette
from "../../features/command-palette/CommandPalette";

import useCommandPalette
from "../../hooks/useCommandPalette";

import KeyboardShortcutProvider
from "../../features/keyboard-shortcuts/KeyboardShortcutProvider";

import GlobalSearchModal
from "../../features/search/components/GlobalSearchModal";

import GlobalSearchProvider
from "../../features/global-search/components/GlobalSearchProvider";

import NotificationsCenter
from "../../features/notifications-center/components/NotificationsCenter";

import {
  registerAttendanceRealtime,
} from "../../features/attendance/attendanceRealtime";

const AppSystems = () => {

  const store =
    useStore();

  useCommandPalette();




  useEffect(() => {

    registerAttendanceRealtime(
      store
    );

  }, [store]);




  return (

    <>

      <KeyboardShortcutProvider />

      <GlobalToast />

      <GlobalSlideOver />

      <GlobalLoader />

      <GlobalModal />

      <GlobalSearchModal />

      <GlobalSearchProvider />

      <NotificationsCenter />

      <CommandPalette />

    </>

  );

};

export default AppSystems;