import React, { useState } from "react";
import { Button } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useCategories } from "../../../hooks/useCategories";
import Loading from "../../../components/Loading";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../services/ProductsServices";
import ProductModal from "./components/Modal/ProductModal";
import VariantModal from "./components/Modal/VariantModal";
import {
  createVariant,
  deleteVariant,
  updateVariant,
} from "../../../services/VariantsServices";
import ProductTable from "./components/ProductTable";

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
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isUnique, setIsUnique] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileListVariant, setFileListVariant] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isClothings, setIsClothings] = useState(false);
  if (loading && !products?.items) return <Loading loading />;
  if (error) navigate("/loi");

  const handleAddProduct = () => {
    setProductModalVisible(true);
    setDisabled(false);
    setIsUnique(false);
  };

  const handleProductModalSubmit = async (values) => {
    const formData = new FormData();
    setNewLoading(true);

    if (editingProduct?.id) {
      const res = await updateProduct(
        {
          category_id: values.category_id,
          name: values.name,
          description: values.description || "",
        },
        editingProduct.id
      );
      if (res.status === 200) {
        toast.success("Cập nhật sản phẩm thành công!");
        refetch();
      } else {
        toast.error(res.message);
      }
    } else {
      if (values.unique) {
        if (!values.file?.length <= 0) {
          toast.error("Vui lòng chọn hình ảnh");
          setNewLoading(false);
          return;
        }
        formData.append("name", values.name);
        formData.append("desc", values.description || "");
        formData.append("category_id", values.category_id);
        formData.append("unique", "true");
        formData.append("stock", values.stock);
        formData.append(
          "price",
          values.price ? parseInt(values.price.replace(/\./g, "")) : 0
        );
        fileList.forEach((file) => {
          formData.append(`file`, file.originFileObj);
        });
      } else {
        formData.append("name", values.name);
        formData.append("desc", values.description || "");
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
    setFileList([]);
  };

  const handleVariantModalSubmit = async (values) => {
    const formData = new FormData();
    setNewLoading(true);

    if (editingVariant?.id) {
      formData.append("id", editingVariant.id);
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("stock", values.stock);
      formData.append("price", values.price);
      fileListVariant.forEach((file) => {
        formData.append(`file`, file.originFileObj);
      });
      formData.append("product_id", currentProductId);
      try {
        const res = await updateVariant(formData);
        if (res.status === 200) {
          toast.success("Cập nhật mẫu mã thành công!");
          setVariantModalVisible(false);
          setEditingVariant(null);
          setCurrentProductId(null);
          setFileListVariant([]);
          refetch();
        }
      } catch (error) {
        if (error.status === 400) {
          toast.error("Mẫu mã đã tồn tại!");
        } else {
          toast.error(error.message);
        }
      }
    } else {
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("stock", values.stock);
      formData.append(
        "price",
        values.price ? parseInt(values.price.replace(/\./g, "")) : 0
      );
      fileListVariant.forEach((file) => {
        formData.append(`file`, file.originFileObj);
      });
      formData.append("product_id", currentProductId);
      try {
        const res = await createVariant(formData);
        if (res.status === 200) {
          toast.success("Thêm mẫu mã thành công!");
          setVariantModalVisible(false);
          setEditingVariant(null);
          setCurrentProductId(null);
          setFileListVariant([]);
          refetch();
        }
      } catch (error) {
        if (error.status === 400) {
          toast.error("Mẫu mã đã tồn tại!");
        } else {
          toast.error(error.message);
        }
      }
    }
    setNewLoading(false);
  };
  const handleDeleteProduct = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res.status === 200) {
        toast.success("Xóa sản phẩm thành công!");
        refetch();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDeleteVariant = async (id) => {
    try {
      const res = await deleteVariant(id);
      if (res.status === 200) {
        toast.success("Xóa mẫu má thành công!");
        refetch();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-4">
      <Button
        color="default"
        variant="solid"
        onClick={handleAddProduct}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm mới
      </Button>
      <ProductTable
        products={products}
        categories={categories}
        payload={payload}
        setPayload={setPayload}
        setEditingProduct={setEditingProduct}
        setDisabled={setDisabled}
        setProductModalVisible={setProductModalVisible}
        setEditingVariant={setEditingVariant}
        setVariantModalVisible={setVariantModalVisible}
        setCurrentProductId={setCurrentProductId}
        setIsClothings={setIsClothings}
        setIsUnique={setIsUnique}
        setFileListVariant={setFileListVariant}
        handleDeleteProduct={handleDeleteProduct}
        handleDeleteVariant={handleDeleteVariant}
      />
      <ProductModal
        visible={productModalVisible}
        onCancel={() => {
          setProductModalVisible(false);
          setEditingProduct(null);
          setDisabled(false);
          setIsUnique(false);
          setFileList([]);
        }}
        onOk={handleProductModalSubmit}
        initialValues={editingProduct}
        categories={categories}
        newLoading={newLoading}
        isUnique={isUnique}
        setIsUnique={setIsUnique}
        fileList={fileList}
        setFileList={setFileList}
        disabled={disabled}
      />
      <VariantModal
        visible={variantModalVisible}
        onCancel={() => {
          setVariantModalVisible(false);
          setEditingVariant(null);
          setCurrentProductId(null);
          setIsClothings(false);
          setFileListVariant([]);
        }}
        onOk={handleVariantModalSubmit}
        initialValues={editingVariant}
        newLoading={newLoading}
        fileListVariant={fileListVariant}
        setFileListVariant={setFileListVariant}
        isClothings={isClothings}
      />
    </div>
  );
}
