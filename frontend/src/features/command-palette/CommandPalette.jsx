import {
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  closeCommandPalette,
} from "./commandPaletteSlice";

import CommandPaletteSearch
from "./CommandPaletteSearch";

import {
  commandActions,
} from "../../constants/commandActions";

import CommandPaletteItem
from "./CommandPaletteItem";

import useDebounce
from "../../hooks/useDebounce";

import {
  useGlobalSearchQuery,
} from "../search/searchApi";

import GlobalSearchResults
from "../search/GlobalSearchResults";

import SearchLoadingState
from "../search/SearchLoadingState";

import SearchEmptyState
from "../search/SearchEmptyState";

const CommandPalette = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const isOpen =
    useSelector(
      (state) =>
        state.commandPalette.isOpen
    );

  const [
    search,
    setSearch,
  ] = useState("");



  /*
  |--------------------------------------------------------------------------
  | 🟣 DEBOUNCE
  |--------------------------------------------------------------------------
  */

  const debouncedSearch =
    useDebounce(search);




  /*
  |--------------------------------------------------------------------------
  | 🟣 GLOBAL SEARCH
  |--------------------------------------------------------------------------
  */

  const {
    data,
    isLoading,
  } = useGlobalSearchQuery(

    debouncedSearch,

    {
      skip:
        !debouncedSearch,
    }

  );




  /*
  |--------------------------------------------------------------------------
  | 🟣 STATIC COMMANDS
  |--------------------------------------------------------------------------
  */

  const filteredCommands =
    useMemo(() => {

      return commandActions.filter(
        (command) =>

          command.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    }, [search]);




  /*
  |--------------------------------------------------------------------------
  | 🟣 CLOSE
  |--------------------------------------------------------------------------
  */

  const handleClose =
    () => {

      dispatch(
        closeCommandPalette()
      );

    };




  /*
  |--------------------------------------------------------------------------
  | 🟣 SELECT
  |--------------------------------------------------------------------------
  */

  const handleSelect =
    (item) => {

      if (
        item.type ===
        "navigation"
      ) {

        navigate(
          item.path
        );

      }

      handleClose();

    };




  if (!isOpen)
    return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-start
        justify-center
        bg-black/40
        p-6
      "
    >

      <div
        className="
          mt-20
          w-full
          max-w-2xl
          rounded-3xl
          border
          bg-white
          p-4
          shadow-2xl
        "
      >

        {/* 🟣 SEARCH */}

        <CommandPaletteSearch
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />




        {/* 🟣 STATIC COMMANDS */}

        {!search && (

          <div
            className="
              mt-4
              space-y-2
            "
          >

            {filteredCommands.map(
              (item) => (

                <CommandPaletteItem

                  key={item.id}

                  item={item}

                  onSelect={
                    handleSelect
                  }

                />

              )
            )}

          </div>

        )}





        {/* 🟣 SEARCH LOADING */}

        {search && isLoading && (

          <div className="mt-4">

            <SearchLoadingState />

          </div>

        )}





        {/* 🟣 SEARCH RESULTS */}

        {search && data?.data && (

          <div className="mt-4">

            <GlobalSearchResults
              results={data.data}
            />

          </div>

        )}





        {/* 🟣 EMPTY */}

        {search &&
          !isLoading &&
          data?.data &&
          data.data.students
            ?.length === 0 &&
          data.data.teachers
            ?.length === 0 && (

            <SearchEmptyState />

          )}

      </div>

    </div>

  );

};

export default
CommandPalette;