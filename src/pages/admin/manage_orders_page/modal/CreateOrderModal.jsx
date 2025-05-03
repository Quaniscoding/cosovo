import React from "react";
import ModalReuse from "../../../../components/modal/ModalReuse";
import ProductSelector from "../components/ProductSelector";

export default function CreateOrderModal({
  isModalOpen,
  onCancel,
  onOk,
  products,
  payloadProducts,
  setPayloadProducts,
  selectedQuantities,
  handleQuantityChange,
  handleRemoveVariant,
  formResetKey,
}) {
  const dataFields = [
    {
      name: "customer_name",
      label: "Tên khách hàng",
      placeholder: "Nhập tên khách hàng",
      rules: [{ required: true, message: "Vui nhập tên khách hàng" }],
    },
    {
      name: "customer_phone",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
      rules: [{ required: true, message: "Vui nhập số điện thoại" }],
    },
    {
      name: "customer_email",
      label: "Email",
      placeholder: "Nhập email",
      rules: [{ required: true, message: "Vui nhập email" }],
    },
    {
      name: "customer_address",
      label: "Địa chỉ",
      placeholder: "Nhập Địa chỉ",
      rules: [{ required: true, message: "Vui nhập Địa chỉ" }],
    },
    {
      name: "customer_note",
      label: "Ghi chú",
      placeholder: "Nhập ghi chú",
    },
  ];
  return (
    <ModalReuse
      visible={isModalOpen}
      title={"Tạo đơn hàng"}
      fields={dataFields}
      onCancel={onCancel}
      onOk={onOk}
      component={
        <ProductSelector
          products={products}
          payloadProducts={payloadProducts}
          setPayloadProducts={setPayloadProducts}
          selectedQuantities={selectedQuantities}
          handleQuantityChange={handleQuantityChange}
          handleRemoveVariant={handleRemoveVariant}
        />
      }
      formResetKey={formResetKey}
    />
  );
}
