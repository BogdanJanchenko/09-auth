import css from "./SearchBox.module.css";

interface SearchBoxProps {
  setSearchQuery: (query: string) => void;
}

const SearchBox = ({ setSearchQuery }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) => {
        setSearchQuery(event.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
