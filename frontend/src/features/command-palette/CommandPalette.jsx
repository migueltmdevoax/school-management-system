import { useMemo, useState }   from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate }         from "react-router-dom";
import { closeCommandPalette } from "./commandPaletteSlice";
import CommandPaletteSearch    from "./CommandPaletteSearch";
import CommandPaletteItem      from "./CommandPaletteItem";
import useDebounce             from "../../hooks/useDebounce";
import { useGlobalSearchQuery } from "../search/searchApi";
import GlobalSearchResults     from "../search/GlobalSearchResults";
import { commandActions }      from "../../constants/commandActions";

const CommandPalette = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const isOpen    = useSelector((s) => s.commandPalette.isOpen);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGlobalSearchQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });

  const filteredCommands = useMemo(() =>
    commandActions.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const handleClose  = () => { dispatch(closeCommandPalette()); setSearch(""); };
  const handleSelect = (item) => {
    if (item.type === "navigation") navigate(item.path);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 p-6">
      <div className="mt-20 w-full max-w-2xl rounded-3xl border bg-white p-4 shadow-2xl">
        <CommandPaletteSearch value={search} onChange={(e) => setSearch(e.target.value)} />

        {!search && (
          <div className="mt-4 space-y-2">
            {filteredCommands.map((item) => (
              <CommandPaletteItem key={item.id} item={item} onSelect={handleSelect} />
            ))}
          </div>
        )}

        {search && isLoading && (
          <div className="mt-4 space-y-2">
            {[1,2,3].map((i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-gray-100" />)}
          </div>
        )}

        {search && data?.data && (
          <div className="mt-4">
            <GlobalSearchResults results={data.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;