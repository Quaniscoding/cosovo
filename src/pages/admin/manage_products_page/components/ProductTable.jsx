import { Table, Button, Popconfirm, Space, Image } from "antd";
import moment from "moment";
import ActionButtons from "./ActionButtons.jsx";
import { formatVND } from "../../../../helpers/format";
import { categoriesTranslations } from "../../../../components/constants/categories.js";

const ProductTable = ({
  products,
  categories,
  payload,
  setPayload,
  setEditingProduct,
  setProductModalVisible,
  setEditingVariant,
  setVariantModalVisible,
  setCurrentProductId,
  setDisabled,
  setFileListVariant,
  handleDeleteProduct,
  handleDeleteVariant,
}) => {
  const columns = [
    { title: "Tên sản phẩm", dataIndex: "name", sorter: true, width: 200 },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 250,
      render: (description) =>
        description ? description.slice(0, 50) + "..." : "Chưa có mô tả",
    },
    {
      title: "Danh mục",
      dataIndex: "category_id",
      sorter: true,
      width: 150,
      render: (id) => {
        const category = categories.find((c) => c.id === id);
        return (
          <span className="capitalize">
            {categoriesTranslations[category?.name] || category?.name}
          </span>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      sorter: true,
      width: 160,
      render: (text) => moment(text).format("HH:mm DD/MM/YYYY"),
    },
    {
      title: "Hành động",
      key: "actions",
      width: 160,
      render: (_, record) => (
        <ActionButtons
          record={record}
          onEdit={() => {
            setEditingProduct(record);
            setProductModalVisible(true);
            setDisabled(true);
          }}
          onDelete={() => handleDeleteProduct(record.id)}
          onAddVariant={() => {
            setCurrentProductId(record.id);
            setEditingVariant({});
            setVariantModalVisible(true);
          }}
        />
      ),
    },
  ];
  // console.log(products.items);

  const variantColumns = [
    {
      title: "Màu sắc",
      dataIndex: "color",
      width: 100,
      render: (color) => <span> {color}</span>,
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      width: 100,
      render: (size) => <span className="font-semibold">{size}</span>,
    },
    { title: "Tồn", dataIndex: "stock", width: 80 },
    {
      title: "Giá nhập",
      dataIndex: "cost",
      sorter: true,
      width: 120,
      render: (cost) => cost,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      width: 120,
      render: (price) => price,
    },
    {
      title: "Hình ảnh",
      width: 160,
      render: (_, variant) =>
        variant.images?.map((img) => (
          <Image
            key={img.id}
            src={img.url}
            width={40}
            height={40}
            loading="lazy"
            rootClassName="mr-2"
          />
        )),
    },
    {
      title: "Hành động",
      key: "variantActions",
      width: 140,
      render: (_, variant) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setFileListVariant(variant.images);
              setEditingVariant(variant);
              setCurrentProductId(variant.product_id);
              setVariantModalVisible(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Xóa mẫu mã?"
            onConfirm={() => {
              handleDeleteVariant(variant.id);
            }}
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
    <Table
      dataSource={products?.items}
      rowKey="id"
      columns={columns}
      size="middle"
      expandable={{
        expandedRowRender: (product) => {
          const category = categories.find((c) => c.id === product.category_id);
          const isClothing = category?.name === "Clothing";

          const variantData = product.variants?.map((variant) => ({
            ...variant,
            isClothing,
          }));

          return (
            <Table
              dataSource={variantData}
              rowKey="id"
              size="small"
              columns={variantColumns}
              pagination={false}
            />
          );
        },
      }}
      pagination={{
        total: products?.total_items,
        pageSize: payload.size,
        onChange: (page) => setPayload((prev) => ({ ...prev, page })),
      }}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ProductTable;
