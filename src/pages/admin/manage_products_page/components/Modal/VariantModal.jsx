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
}) => {
  const variantFields = [
    {
      name: "color",
      label: "Màu sắc",
      placeholder: "Nhập màu sắc",
      rules: [{ required: false }],
    },
    {
      name: "size",
      label: "Kích cỡ",
      placeholder: "Nhập kích cỡ",
      rules: [{ required: false }],
    },
    {
      name: "stock",
      label: "Tồn kho",
      type: "number",
      placeholder: "Nhập số lượng tồn",
      rules: [{ required: true, message: "Vui lòng nhập tồn kho" }],
    },
    {
      name: "cost",
      label: "Giá nhập",
      placeholder: "Nhập giá nhập",
      rules: [{ required: true, message: "Vui lòng nhập giá nhập" }],
    },
    {
      name: "price",
      label: "Giá bán",
      placeholder: "Nhập giá bán",
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
