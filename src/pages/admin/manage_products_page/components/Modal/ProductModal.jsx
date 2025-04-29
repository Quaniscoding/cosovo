import { Select, Switch, Upload } from "antd";
import ModalReuse from "../../../../../components/modal/ModalReuse";
import { useState } from "react";

const ProductModal = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  categories,
  newLoading,
}) => {
  const [isUnique, setIsUnique] = useState(false);

  const productFields = [
    {
      name: "name",
      label: "Tên sản phẩm",
      placeholder: "Nhập tên sản phẩm",
      rules: [{ required: true, message: "Vui lòng nhập tên sản phẩm" }],
    },
    {
      name: "desc",
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
    ...(isUnique
      ? [
          {
            name: "file",
            label: "Hình ảnh",
            component: (
              <Upload.Dragger
                name="file"
                beforeUpload={() => false}
                listType="picture"
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                }}
                style={{ width: "100%" }}
                maxCount={1}
                defaultFileList={
                  initialValues?.file?.url
                    ? [
                        {
                          uid: "-1",
                          name: "image.png",
                          status: "done",
                          url: initialValues.file.url,
                        },
                      ]
                    : []
                }
              >
                <p className="ant-upload-text">
                  Nhấn hoặc kéo ảnh vào đây để thêm hình ảnh
                </p>
              </Upload.Dragger>
            ),
            rules: [{ required: true, message: "Vui lòng tải lên hình ảnh" }],
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
