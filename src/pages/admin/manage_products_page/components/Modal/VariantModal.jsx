import React from "react";
import { Select, Upload } from "antd";
import ModalReuse from "../../../../../components/modal/ModalReuse";
import UploadComponent from "../UploadComponent";
import { colorOptions } from "../../../../../constants/colors";

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
      width={600}
    />
  );
};

export default VariantModal;
