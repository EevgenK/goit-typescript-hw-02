import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import s from "./SearchBar.module.css";
type SearchBarProps = {
  onSubmit: (el: string) => void;
};
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (error) {
      toast.error("Sorry, search-bar can't be empty! Please, try again.", {
        className: s.error,
      });
      setError(false);
    }
  }, [error]);
  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };
  const onHandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { value } = (e.target as HTMLFormElement).input;
    if (value.trim() === "") {
      setSearch("");
      setError(true);
      return;
    }
    onSubmit(value);
  };
  return (
    <header className={s.searchbar}>
      <form onSubmit={onHandleSubmit} className={s.searchform}>
        <input
          value={search}
          onChange={onHandleChange}
          name="input"
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={`${s.button} ${s.icon}`} type="submit">
          <CiSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
