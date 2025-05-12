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
  const [payload, setPayload] = useState({
    page: 1,
    size: 10,
    startDate: null,
    endDate: null,
  });
  const { revenues, loadingPage, loadingTable, error } = useRevenues(payload);
  // if (error) navigate("/loi");
  console.log(revenues);

  const columns = [
    { title: "ID đơn hàng", dataIndex: "order_id", key: "order_id" },
    {
      title: "Tổng tiền",
      dataIndex: "total_price",
      key: "total_price",
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
    setPayload((p) => ({
      ...p,
      startDate: null,
      endDate: null,
      page: 1,
    }));
    setSelectedWeek(null);
    setSelectedMonth(null);
  };
  if (loadingPage) return <Loading loading={loadingPage} />;
  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={24} className="mb-4">
          <Statistic
            title="Tổng doanh thu"
            value={formatVND(revenues?.total_revenue) || 0}
            valueStyle={{ color: "#3f8600" }}
            suffix="đ"
            groupSeparator="."
          />
        </Col>
        <Col>
          <WeekPicker
            value={selectedWeek}
            onChange={handleWeekChange}
            locale={viVN}
            format="WW/YYYY"
            placeholder="Chọn tuần"
          />
        </Col>
        <Col>
          <MonthPicker
            value={selectedMonth}
            onChange={handleMonthChange}
            locale={viVN}
            format="MM/YYYY"
            placeholder="Chọn tháng"
          />
        </Col>
        <Col>
          <Button onClick={handleReset}>Xóa lọc</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={revenues?.revenues}
        loading={loadingTable}
        pagination={{
          onChange: (page, size) => {
            setPayload((p) => ({ ...p, page: page, size: size }));
          },
        }}
      />
    </div>
  );
}
