import React, { useState } from "react";
import { Upload, Image } from "antd";
import { getBase64 } from "../../../../helpers/getBase64";
import { normalizeFileImage } from "../../../../helpers/normalizeFileImage";
export default function UploadComponent({ fileList, setFileList }) {
  const normalizedFileList = normalizeFileImage(fileList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      <Upload.Dragger
        name="file"
        listType="picture-card"
        multiple
        beforeUpload={() => false}
        accept="image/*"
        fileList={normalizedFileList}
        onChange={handleChange}
        onPreview={handlePreview}
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
        }}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <p className="ant-upload-text">
          Nhấn hoặc kéo ảnh vào đây để thêm hình ảnh
        </p>
      </Upload.Dragger>

      {/* Modal preview ảnh */}
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          loading="lazy"
        />
      )}
    </>
  );
}
