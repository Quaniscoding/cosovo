import { Modal } from "antd";
import { X } from "lucide-react";
import React from "react";
import ReusableButton from "../../components/ui/Button";

export default function ModalNotification({
  isModalOpen,
  handleContinueShopping,
  handleViewCart,
  productDetails,
}) {
  return (
    <Modal
      open={isModalOpen}
      footer={null}
      centered
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      closable={false}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex justify-between items-center gap-4 w-full mt-6">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
            {productDetails.quantity} Sản phẩm đã được thêm vào giỏ hàng của bạn
          </h2>
          <button onClick={handleContinueShopping}>
            <X
              size={24}
              className="text-gray-800 cursor-pointer hover:text-gray-600"
            />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
          <ReusableButton onClick={handleViewCart}>Xem giỏ hàng</ReusableButton>

          <ReusableButton variant="secondary" onClick={handleContinueShopping}>
            Tiếp tục mua sắm
          </ReusableButton>
        </div>
      </div>
    </Modal>
  );
}
