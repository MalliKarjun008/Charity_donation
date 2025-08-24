import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

function SearchInput({ searchText, onSearchChange }) {
  const [searchActive, setSearchActive] = useState(false);
  const handleSearchFocus = () => setSearchActive(true);

  const handleCancelSearch = () => {
    onSearchChange("");
  };
  const handleSearchBlur = () => {
    if (!searchText) {
      setSearchActive(false);
    }
  };

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };
  return (
    <div
      className={`w-[80%] flex items-center justify-between mx-10 px-5 py-2 mt-5 border rounded-lg shadow-sm shadow-slate-500 ${
        searchActive ? "border-blue-500" : "border-gray-600"
      }`}
    >
      <div className="flex gap-3 justify-center items-center w-[93%]">
        <IoSearchOutline className={searchActive ? "text-blue-500" : ""} />
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div onClick={handleCancelSearch}>
        <MdCancel className="hover:cursor-pointer" />
      </div>
    </div>
  );
}

export default SearchInput;
