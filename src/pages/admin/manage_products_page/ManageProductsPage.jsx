import React, { useState } from "react";
import { Table, Button, Popconfirm, Space, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import Loading from "../../../components/Loading";
import { createProduct } from "../../../services/ProductsServices";
import ProductModal from "./components/Modal/ProductModal";
import VariantModal from "./components/Modal/VariantModal";
import { toast } from "react-toastify";
import { createVariant } from "../../../services/VariantsServices";
import { formatVND } from "../../../helpers/format";

export default function ManageProductsPage() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    page: 1,
    size: 12,
    category: "",
    search: "",
  });
  const { products, loading, error, refetch } = useProducts(payload);
  const { categories } = useCategories();
  const [newLoading, setNewLoading] = useState(false);
  // Modal states
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);

  if (loading && !products?.items) return <Loading loading />;
  if (error) navigate("/loi");

  // Product Handlers
  const handleAddProduct = () => {
    setEditingProduct({});
    setProductModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductModalVisible(true);
  };

  const handleDeleteProduct = (id) => {
    // Implement delete logic
    // deleteProduct.mutate(id, { onSuccess: () => { /* refetch */ } });
  };

  const handleProductModalSubmit = async (values) => {
    const formData = new FormData();

    setNewLoading(true);

    if (editingProduct?.id) {
      // TODO: Thêm xử lý cập nhật sản phẩm
    } else {
      if (values.unique) {
        if (!values.file?.fileList?.length) {
          toast.error("Vui lòng chọn hình ảnh");
          setNewLoading(false);
          return;
        }

        formData.append("name", values.name);
        formData.append("desc", values.desc || "");
        formData.append("category_id", values.category_id);
        formData.append("unique", "true");
        formData.append("stock", values.stock);
        formData.append(
          "price",
          values.price ? parseInt(values.price.replace(/\./g, "")) : 0
        );
        formData.append("file", values.file.fileList[0].originFileObj);
      } else {
        formData.append("name", values.name);
        formData.append("desc", values.desc || "");
        formData.append("category_id", values.category_id);
        formData.append("unique", "false");
      }

      try {
        const res = await createProduct(formData);
        if (res.status === 200) {
          toast.success("Thêm sản phẩm thành công!");
          refetch();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    setNewLoading(false);
    setProductModalVisible(false);
    setEditingProduct(null);
  };

  // Variant Handlers
  const handleAddVariant = (product) => {
    setCurrentProductId(product.id);
    setEditingVariant({});
    setVariantModalVisible(true);
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setCurrentProductId(variant.product_id);
    setVariantModalVisible(true);
  };

  const handleDeleteVariant = (id) => {
    // Implement delete variant logic
  };

  const handleVariantModalSubmit = async (values) => {
    const formData = new FormData();
    setNewLoading(true);

    if (editingVariant?.id) {
      // Update variant logic
    } else {
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("stock", values.stock);
      formData.append(
        "price",
        values.price ? parseInt(values.price.replace(/\./g, "")) : 0
      );
      formData.append("file", values.file.fileList[0].originFileObj);
      formData.append("product_id", currentProductId);
      try {
        const res = await createVariant(formData);
        if (res.status === 200) {
          toast.success("Thêm mẫu mã thành công!");
          refetch();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    setVariantModalVisible(false);
    setEditingVariant(null);
    setCurrentProductId(null);
    setNewLoading(false);
  };

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", sorter: true },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      sorter: true,
      render: (id) => {
        const category = categories.find((c) => c.id === id);
        return <span className="capitalize">{category?.name}</span>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      sorter: true,
      render: (date) => new Date(date).toLocaleString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => handleEditProduct(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa sản phẩm?"
            onConfirm={() => handleDeleteProduct(record.id)}
          >
            <Button size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
          <Button
            size="small"
            type="primary"
            onClick={() => handleAddVariant(record)}
          >
            Thêm mẫu mã
          </Button>
        </Space>
      ),
    },
  ];

  const variantColumns = [
    { title: "Màu sắc", dataIndex: "color" },
    { title: "Kích cỡ", dataIndex: "size" },
    { title: "Tồn", dataIndex: "stock" },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      render: (price) => formatVND(price),
    },
    {
      title: "Hình ảnh",
      render: (_, variant) =>
        variant.images?.map((img) => (
          <Image key={img.id} src={img.url} width={50} height={50} />
        )),
    },
    {
      title: "Hành động",
      key: "variantActions",
      render: (_, variant) => (
        <Space>
          <Button size="small" onClick={() => handleEditVariant(variant)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa variant?"
            onConfirm={() => handleDeleteVariant(variant.id)}
          >
            <Button size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button
        type="primary"
        onClick={handleAddProduct}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm mới
      </Button>
      <Table
        dataSource={products?.items}
        rowKey="id"
        columns={columns}
        expandable={{
          expandedRowRender: (product) => (
            <Table
              dataSource={product.variants}
              rowKey="id"
              size="middle"
              columns={variantColumns}
            />
          ),
        }}
        size="large"
        pagination={{
          total: products?.total_items,
          pageSize: payload.size,
          onChange: (page) => setPayload((prev) => ({ ...prev, page })),
        }}
      />
      <ProductModal
        visible={productModalVisible}
        onCancel={() => {
          setProductModalVisible(false);
          setEditingProduct(null);
        }}
        onOk={handleProductModalSubmit}
        initialValues={editingProduct}
        categories={categories}
        newLoading={newLoading}
      />
      <VariantModal
        visible={variantModalVisible}
        onCancel={() => {
          setVariantModalVisible(false);
          setEditingVariant(null);
          setCurrentProductId(null);
        }}
        onOk={handleVariantModalSubmit}
        initialValues={editingVariant}
        newLoading={newLoading}
      />
    </div>
  );
}
