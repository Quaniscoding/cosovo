import React from "react";
import { Pagination } from "antd";

const PaginationCustom = ({ total, pageSize, current, onChange }) => {
  return (
    <div className="flex items-center justify-between sm:justify-end my-4 w-full ">
      <span className="text-base font-semibold">Toàn bộ sản phẩm: {total}</span>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default PaginationCustom;
