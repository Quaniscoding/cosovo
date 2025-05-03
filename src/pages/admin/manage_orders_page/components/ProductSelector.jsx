import {
  Card,
  Col,
  Input,
  InputNumber,
  List,
  Row,
  Image,
  Tag,
  Button,
} from "antd";
import React, { useState } from "react";
import { formatVND } from "../../../../helpers/format";

export default function ProductSelector({
  products,
  payloadProducts,
  setPayloadProducts,
  selectedQuantities,
  handleQuantityChange,
  handleRemoveVariant,
}) {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const filteredProducts = products?.items?.filter((product) =>
    product.name.toLowerCase().includes(payloadProducts.search.toLowerCase())
  );

  const selectedProduct = filteredProducts?.find(
    (product) => product.id === selectedProductId
  );

  const selectedVariants = [];
  products?.items?.forEach((product) => {
    product.variants.forEach((variant) => {
      if (selectedQuantities[variant.id] > 0) {
        selectedVariants.push({
          ...variant,
          productName: product.name,
          quantity: selectedQuantities[variant.id],
        });
      }
    });
  });

  const onRemoveVariant = (variantId) => {
    if (handleRemoveVariant) {
      handleRemoveVariant(variantId);
    } else {
      handleQuantityChange(variantId, 0);
    }
  };
  return (
    <Row gutter={24}>
      {/* Danh sách sản phẩm */}
      <Col
        span={10}
        className="mb-3 !max-h-[400px] !min-h-[400px] overflow-auto"
      >
        <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
        <Input
          className="!mb-3"
          value={payloadProducts.search}
          onChange={(e) =>
            setPayloadProducts({
              ...payloadProducts,
              search: e.target.value,
            })
          }
          placeholder="Tìm kiếm sản phẩm"
        />
        <List
          bordered
          dataSource={filteredProducts}
          className="bg-white rounded shadow-sm max-h-[300px] overflow-auto"
          renderItem={(item) => (
            <List.Item
              className={`cursor-pointer ${
                selectedProductId === item.id ? "bg-blue-100" : ""
              }`}
              onClick={() =>
                setSelectedProductId(
                  selectedProductId === item.id ? null : item.id
                )
              }
            >
              <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                {" "}
                {item.name}
              </span>
            </List.Item>
          )}
        />
      </Col>

      {/* Danh sách variant */}
      <Col span={14}>
        <h3 className="text-lg font-semibold mb-2">Mẫu mã</h3>
        {selectedProduct && (
          <List
            dataSource={selectedProduct.variants}
            renderItem={(variant) => (
              <Card
                key={variant.id}
                className="border border-gray-200 rounded shadow-sm !mb-3"
              >
                <Row gutter={16} align="middle">
                  <Col span={4}>
                    <Image
                      width={64}
                      height={64}
                      className="rounded object-cover"
                      src={variant.images[0]?.url}
                      fallback="src/assets/images/noimage.png"
                      alt="Ảnh sản phẩm"
                      style={{ borderRadius: 8 }}
                    />
                  </Col>
                  <Col span={12}>
                    <p className="font-semibold mb-1">
                      {variant.color.toUpperCase()} / {variant.size}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Giá: {variant.price.toLocaleString()}đ
                    </p>
                    <p className="text-gray-600 text-sm">
                      Còn lại: {variant.stock}
                    </p>
                  </Col>
                  <Col span={8}>
                    <InputNumber
                      min={0}
                      max={variant.stock}
                      value={selectedQuantities[variant.id] || 0}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleQuantityChange(variant.id, value)
                      }
                    />
                  </Col>
                </Row>
              </Card>
            )}
            className="!max-h-[300px] overflow-auto"
          />
        )}
      </Col>
      {/* Danh sách variant đã chọn */}
      <Col span={24}>
        <h3 className="text-lg font-semibold mb-2">Sản phẩm đã chọn</h3>
        <div className="mb-3 max-h-[150px] min-h-[150px] overflow-auto">
          {selectedVariants.length > 0 && (
            <Card size="small">
              <List
                dataSource={selectedVariants}
                renderItem={(variant) => (
                  <List.Item
                    actions={[
                      <Button
                        size="small"
                        danger
                        onClick={() => onRemoveVariant(variant.id)}
                      >
                        Xóa
                      </Button>,
                    ]}
                  >
                    <Tag color="blue">{variant.productName}</Tag>
                    <span>
                      {variant.color.toUpperCase()} / {variant.size}
                    </span>
                    <span style={{ marginLeft: 12 }}>
                      Số lượng: <b>{variant.quantity}</b>
                    </span>
                    <span style={{ marginLeft: 12 }}>
                      Giá: <b>{formatVND(variant.price)}</b>
                    </span>
                  </List.Item>
                )}
              />
            </Card>
          )}
        </div>
      </Col>
    </Row>
  );
}
