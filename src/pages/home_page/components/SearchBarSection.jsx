/* eslint-disable no-empty-pattern */

import React, { useState } from "react";
import InputSearch from "./InputSearch";
import { useProducts } from "../../../hooks/useProducts";

export default function SearchBarSection() {
  const [payload, setPayload] = useState({
    search: "",
  });
  const {} = useProducts(payload);

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mt-6 ">
      <InputSearch
        searchOpen={true}
        payload={payload}
        setPayload={setPayload}
        handleSearch={handleSearch}
      />
    </div>
  );
}
