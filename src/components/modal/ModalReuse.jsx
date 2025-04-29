import React, { useEffect } from "react";
import { Modal, Form, Button, Input } from "antd";
import InputField from "../ui/Input";

export default function ModalReuse({
  visible,
  onCancel,
  onOk,
  initialValues = {},
  fields = [],
  title = "",
  width = 600,
  newLoading,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values) => {
    onOk(values);
  };

  // Formatter and parser for price field
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      width={width}
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={newLoading}
        >
          Thêm
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        {fields.map(
          (
            { name, label, placeholder, type = "text", component, rules },
            idx
          ) => {
            // Handle price field specifically
            if (name === "price") {
              return (
                <Form.Item
                  key={idx}
                  name={name}
                  label={
                    <span className="text-gray-700 font-semibold">{label}</span>
                  }
                  rules={
                    rules || [
                      { required: true, message: "Vui lòng nhập giá" },
                      {
                        validator(_, value) {
                          const raw = value?.replace(/\./g, "");
                          if (!raw || isNaN(raw) || parseInt(raw) < 0) {
                            return Promise.reject("Giá phải là số không âm");
                          }
                          return Promise.resolve();
                        },
                      },
                    ]
                  }
                >
                  <Form.Item noStyle shouldUpdate>
                    {({ getFieldValue, setFieldsValue }) => (
                      <Input
                        type="text"
                        placeholder={placeholder || "Nhập giá"}
                        value={getFieldValue(name)}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, "");
                          const formatted =
                            Number(rawValue).toLocaleString("vi-VN");
                          setFieldsValue({ [name]: formatted });
                        }}
                        addonAfter="đ"
                      />
                    )}
                  </Form.Item>
                </Form.Item>
              );
            }

            // Handle custom component fields
            if (component) {
              return (
                <Form.Item
                  key={idx}
                  name={name}
                  label={
                    <span className="text-gray-700 font-semibold">{label}</span>
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

            // Handle standard input fields
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
    </Modal>
  );
}
