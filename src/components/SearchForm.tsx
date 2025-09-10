import type { ReactElement } from "react";

type Props = {
  query: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const SearchForm = ({ query, onChange, onSubmit }: Props): ReactElement => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ex: Margarita"
      />
      <button type="submit">Sök</button>
    </form>
  );
};

export default SearchForm;
