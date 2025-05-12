import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Row, Col } from "antd";
import InputField from "../ui/Input";

export default function ModalReuse({
  visible,
  onCancel,
  onOk,
  initialValues = {},
  fields = [],
  title = "",
  width = 1500,
  newLoading,
  component,
  formResetKey,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [formResetKey, form]);
  useEffect(() => {
    if (!visible) {
      form.resetFields();
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values) => {
    onOk(values);
  };

  return (
    <Modal
      forceRender
      title={title}
      open={visible}
      width={width}
      onCancel={onCancel}
      closeIcon={false}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          color="default"
          variant="solid"
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={newLoading}
        >
          {component ? "Tạo đơn hàng" : initialValues?.id ? "Cập nhật" : "Thêm"}
        </Button>,
      ]}
    >
      <Row gutter={24}>
        <Col span={component ? 12 : 24}>
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleFinish}
            onReset={() => form.resetFields()}
          >
            {/* Left: Form fields */}

            {fields.map(
              (
                { name, label, placeholder, type = "text", component, rules },
                idx
              ) => {
                if (name === "price" || name === "cost") {
                  return (
                    <Form.Item
                      key={idx}
                      name={name}
                      label={
                        <span className="text-gray-700 font-semibold">
                          {label}
                        </span>
                      }
                      rules={
                        rules || [
                          { required: true, message: "Vui lòng nhập giá" },
                          {
                            validator(_, value) {
                              const raw = value?.replace(/\./g, "");
                              if (!raw || isNaN(raw) || parseInt(raw) < 0) {
                                return Promise.reject(
                                  "Giá phải là số không âm"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]
                      }
                    >
                      <Form.Item
                        name={name}
                        normalize={(value) => {
                          const rawValue = String(value).replace(/\D/g, "");
                          return Number(rawValue).toLocaleString("vi-VN");
                        }}
                      >
                        <Input
                          placeholder={placeholder || "Nhập giá"}
                          addonAfter="đ"
                        />
                      </Form.Item>
                    </Form.Item>
                  );
                }

                if (component) {
                  return (
                    <Form.Item
                      key={idx}
                      name={name}
                      label={
                        <span className="text-gray-700 font-semibold">
                          {label}
                        </span>
                      }
                      rules={
                        rules || [
                          { required: true, message: `Vui lòng nhập ${label}` },
                        ]
                      }
                    >
                      {component}
                    </Form.Item>
                  );
                }
                if (type === "textarea") {
                  return (
                    <Form.Item
                      key={idx}
                      name={name}
                      label={
                        <span className="text-gray-700 font-semibold">
                          {label}
                        </span>
                      }
                      rules={rules}
                    >
                      <Input.TextArea placeholder={placeholder} rows={3} />
                    </Form.Item>
                  );
                }
                return (
                  <InputField
                    key={idx}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    rules={rules}
                  />
                );
              }
            )}
          </Form>
        </Col>
        <Col span={12}>{component}</Col>
      </Row>
    </Modal>
  );
}
