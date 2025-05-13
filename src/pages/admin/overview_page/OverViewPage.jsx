/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useRevenues } from "../../../hooks/useRevenues";
import { Table, DatePicker, Row, Col, Button, Statistic } from "antd";
import viVN from "antd/es/date-picker/locale/vi_VN";
const { WeekPicker, MonthPicker } = DatePicker;
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import moment from "moment";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import isoWeek from "dayjs/plugin/isoWeek";
import { formatVND } from "../../../helpers/format";
dayjs.locale("vi");
dayjs.extend(isoWeek);
export default function OverViewPage() {
  const navigate = useNavigate();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const now = moment();
  const [payload, setPayload] = useState({
    page: 1,
    size: 10,
    startDate: now.startOf("month").format("YYYY-MM-DD"),
    endDate: now.endOf("month").format("YYYY-MM-DD"),
  });
  const { revenues, loadingPage, loadingTable, error } = useRevenues(payload);

  const columns = [
    { title: "ID đơn hàng", dataIndex: "id", key: "id" },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => moment(date).format("hh:mm DD/MM/YYYY"),
    },
  ];
  const handleWeekChange = (date) => {
    setSelectedWeek(date);
    if (date) {
      const mDate = moment(date.toDate());
      const startOfWeek = mDate.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = mDate.endOf("isoWeek").format("YYYY-MM-DD");
      setPayload((prev) => ({
        ...prev,
        startDate: startOfWeek,
        endDate: endOfWeek,
        page: 1,
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
        page: 1,
      }));
    }
  };

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
    if (date) {
      const mDate = moment(date.toDate());
      const startOfMonth = mDate.startOf("month").format("YYYY-MM-DD");
      const endOfMonth = mDate.endOf("month").format("YYYY-MM-DD");
      setPayload((prev) => ({
        ...prev,
        startDate: startOfMonth,
        endDate: endOfMonth,
        page: 1,
      }));
    } else {
      setPayload((prev) => ({
        ...prev,
        startDate: null,
        endDate: null,
        page: 1,
      }));
    }
  };
  const handleReset = () => {
    const now = moment();
    setPayload((p) => ({
      ...p,
      startDate: now.startOf("month").format("YYYY-MM-DD"),
      endDate: now.endOf("month").format("YYYY-MM-DD"),
      page: 1,
    }));
    setSelectedWeek(null);
    setSelectedMonth(dayjs(now)); // hoặc dayjs()
  };
  if (loadingPage) return <Loading loading={loadingPage} />;
  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Thống kê: doanh thu & lợi nhuận */}
        <Col xs={24} md={16}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title="Tổng doanh thu"
                value={revenues?.totalPrice || 0}
                valueStyle={{ color: "#3f8600" }}
                suffix="đ"
                groupSeparator="."
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Tổng lợi nhuận"
                value={revenues?.totalProfit || 0}
                valueStyle={{ color: "#3f8600" }}
                suffix="đ"
                groupSeparator="."
              />
            </Col>
          </Row>
        </Col>

        {/* Bộ lọc tuần + tháng */}
        <Col xs={24} md={16}>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <WeekPicker
                value={selectedWeek}
                onChange={handleWeekChange}
                locale={viVN}
                format="WW/YYYY"
                placeholder="Chọn tuần"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8}>
              <MonthPicker
                value={selectedMonth || dayjs(now)}
                onChange={handleMonthChange}
                locale={viVN}
                format="MM/YYYY"
                placeholder="Chọn tháng"
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8}>
              <Button onClick={handleReset} block>
                Xóa lọc
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={revenues?.orders}
        loading={loadingTable}
        rowKey="id"
        pagination={{
          total: revenues?.totalItem || 0,
          onChange: (page, size) => {
            setPayload((p) => ({ ...p, page: page, size: size }));
          },
        }}
      />
    </div>
  );
}
