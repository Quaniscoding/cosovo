import { Select, Switch } from "antd";
import ModalReuse from "../../../../../components/modal/ModalReuse";
import UploadComponent from "../UploadComponent";
const ProductModal = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  categories,
  newLoading,
  fileList,
  setFileList,
  isUnique,
  setIsUnique,
  disabled,
}) => {
  const productFields = [
    {
      name: "name",
      label: "Tên sản phẩm",
      placeholder: "Nhập tên sản phẩm",
      rules: [{ required: true, message: "Vui lòng nhập tên sản phẩm" }],
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Nhập mô tả ngắn gọn",
    },
    {
      name: "category_id",
      label: "Danh mục",
      component: (
        <Select
          placeholder="Chọn danh mục"
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
        />
      ),
      rules: [{ required: true, message: "Vui lòng chọn danh mục" }],
    },
    ...(!disabled
      ? [
          {
            name: "unique",
            label: "Phân loại (Tuỳ chọn)",
            component: (
              <Switch
                checked={isUnique}
                onChange={(checked) => setIsUnique(checked)}
              />
            ),
            rules: [{ required: false }],
          },
        ]
      : []),

    ...(isUnique
      ? [
          {
            name: "file",
            label: "Hình ảnh",
            component: (
              <UploadComponent fileList={fileList} setFileList={setFileList} />
            ),
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
            name: "price",
            label: "Giá",
            type: "number",
            placeholder: "Nhập giá",
            rules: [{ required: true, message: "Vui lòng nhập giá" }],
          },
        ]
      : []),
  ];

  return (
    <ModalReuse
      visible={visible}
      title={initialValues?.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      initialValues={initialValues}
      fields={productFields}
      onCancel={onCancel}
      onOk={onOk}
      newLoading={newLoading}
    />
  );
};

export default ProductModal;
