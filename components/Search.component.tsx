import React from "react";
interface SearchComponentProps {
  showsearch: boolean;
}
function SearchComponent({ showsearch }: SearchComponentProps) {
  return (
    <div
      className={`transition-all duration-500 z-40 ease-in-out fixed left-0 backdrop-blur-md overflow-hidden ${
        showsearch === true
          ? "h-1/3 rounded-lg top-16 bg-slate-400/30 w-1/2 md:w-1/3 ml-14  border-2 border-slate-500 shadow-lg"
          : "w-0 h-0 top-32 rounded-full -translate-x-1/2 bg-transparent"
      } `}
    ></div>
  );
}

export default SearchComponent;
