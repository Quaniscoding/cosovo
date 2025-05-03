import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm border-t border-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Hỗ trợ khách hàng</h3>
          <p>Bảo hành & Khiếu nại đơn hàng</p>
          <p>
            Liên hệ tư vấn: <strong>Hải Cosovo</strong>
          </p>
          <p>
            Hotline / Zalo:{" "}
            <a href="tel:0966665665" className="text-black font-medium">
              0966665665
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Kết nối</h3>
          <p>
            Zalo:{" "}
            <a
              href="https://zalo.me/0966665665"
              className="text-gray-600 underline"
            >
              0966665665
            </a>
          </p>
          <p>
            Facebook:{" "}
            <a
              href="https://www.facebook.com/BBCOSOVO/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 underline"
            >
              Tran Duc Hai
            </a>
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Về chúng tôi</h3>
          <p>Chuyên cung cấp thiết bị điện tử & đồ gia dụng chính hãng.</p>
          <p>Uy tín - Tận tâm - Hỗ trợ nhanh chóng.</p>
        </div>
      </div>
      <div className="text-center py-3 border-t border-gray-200 text-gray-500">
        © {new Date().getFullYear()} Hải Cosovo. All rights reserved.
      </div>
    </footer>
  );
}
