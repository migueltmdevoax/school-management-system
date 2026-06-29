const CommandPaletteSearch = ({ value, onChange }) => (
  <input value={value} onChange={onChange} placeholder="Buscar comandos..."
    autoFocus
    className="w-full rounded-2xl border px-4 py-3 outline-none" />
);
export default CommandPaletteSearch;