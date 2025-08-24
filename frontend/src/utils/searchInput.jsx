import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

function SearchInput({ searchText, onSearchChange, placeholder }) {
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
      className={`w-[80%] flex items-center justify-between px-5 py-2  border rounded-lg bg-white shadow-sm shadow-slate-500 
        
      `}
    >
      <div className="flex gap-3 justify-center items-center w-[93%]">
        <IoSearchOutline className={searchActive ? "shadow-lg" : ""} />

        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full"
        />
      </div>
      {searchActive && (
        <div onClick={handleCancelSearch}>
          <MdCancel className="hover:cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
