import React from "react";
import SearchIcon from "@/Assets/Icons/icon_search.svg";

type Props = {
  alt: string;
  onClick?: () => void;
};

const IconSearch: React.FC<Props> = ({ alt, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={SearchIcon} alt={alt} />
    </div>
  );
};

export default IconSearch;
