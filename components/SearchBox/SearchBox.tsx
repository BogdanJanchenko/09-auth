import css from "./SearchBox.module.css";

interface SearchBoxProps {
  setSearchQuery: (query: string) => void;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
}

const SearchBox = ({
  setSearchQuery,
  setCurrentPage,
  currentPage,
}: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) => {
        setSearchQuery(event.currentTarget.value);
        setCurrentPage(currentPage);
      }}
    />
  );
};

export default SearchBox;
