import React from "react";
import { Form, Input } from "antd";

export default function InputField({
  label,
  name,
  placeholder,
  type = "text",
  rules = [],
}) {
  return (
    <Form.Item
      label={<span className="text-gray-700 font-semibold">{label}</span>}
      name={name}
      rules={rules}
    >
      {type === "password" ? (
        <Input.Password
          type={type}
          placeholder={placeholder}
          className="rounded-lg py-2 px-4 border-gray-300 focus:!outline-none focus:!border-gray-400"
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          className="rounded-lg py-2 px-4 border-gray-300 focus:!outline-none focus:!border-gray-400"
          autoComplete="off"
        />
      )}
    </Form.Item>
  );
}
