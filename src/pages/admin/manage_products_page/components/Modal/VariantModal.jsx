import React from "react";
import { Select, Upload } from "antd";
import ModalReuse from "../../../../../components/modal/ModalReuse";
import UploadComponent from "../UploadComponent";

const VariantModal = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  newLoading,
  fileListVariant,
  setFileListVariant,
  isClothings,
}) => {
  const colorOptions = [
    // Quần áo
    { label: "Đen", value: "black" },
    { label: "Trắng", value: "white" },
    { label: "Xám", value: "gray" },
    { label: "Đỏ", value: "red" },
    { label: "Xanh dương", value: "blue" },
    { label: "Vàng", value: "yellow" },
    { label: "Xanh lá", value: "green" },
    { label: "Hồng", value: "pink" },

    // Thiết bị điện tử
    { label: "Bạc", value: "silver" },
    { label: "Vàng đồng", value: "bronze" },
    { label: "Xanh rêu", value: "army_green" },
  ];

  const variantFields = [
    {
      name: "color",
      label: "Màu sắc",
      placeholder: "Chọn màu sắc",
      component: (
        <Select
          placeholder="Chọn màu sắc"
          showSearch
          optionFilterProp="label"
          options={colorOptions}
        />
      ),
      rules: [{ required: true, message: "Vui lòng chọn màu sắc" }],
    },
    ...(isClothings
      ? [
          {
            name: "size",
            label: "Kích cỡ",
            placeholder: "Nhập kích cỡ",
            component: (
              <Select
                placeholder="Chọn kích cỡ"
                options={[
                  { label: "S", value: "S" },
                  { label: "M", value: "M" },
                  { label: "L", value: "L" },
                  { label: "XL", value: "XL" },
                  { label: "XXL", value: "XXL" },
                ]}
              />
            ),
            rules: [{ required: true, message: "Vui lòng nhập kích cỡ" }],
          },
        ]
      : []),
    {
      name: "stock",
      label: "Tồn kho",
      type: "number",
      placeholder: "Nhập số lượng tồn",
      rules: [{ required: true, message: "Vui lòng nhập tồn kho" }],
    },
    {
      name: "price",
      label: "Giá",
      placeholder: "Nhập giá",
      rules: [{ required: true, message: "Vui lòng nhập giá" }],
    },
    {
      name: "file",
      label: "Hình ảnh",
      component: (
        <UploadComponent
          fileList={fileListVariant}
          setFileList={setFileListVariant}
        />
      ),
      rules: [{ required: false }],
    },
  ];

  return (
    <ModalReuse
      visible={visible}
      title={initialValues?.id ? "Sửa mẫu mã" : "Thêm mẫu mã"}
      initialValues={initialValues}
      fields={variantFields}
      onCancel={onCancel}
      onOk={onOk}
      newLoading={newLoading}
    />
  );
};

export default VariantModal;
