import React from "react";
import { Pagination as AntPagination } from "antd";

const Pagination = ({ total, pageSize, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-between sm:justify-end my-4 w-full">
      <span className="text-base font-semibold text-gray-800">
        Total Products: {total}
      </span>
      <AntPagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        showSizeChanger={false}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
        className="custom-pagination"
      />
    </div>
  );
};

export default Pagination;
