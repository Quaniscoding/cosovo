export default function AboutUsPage() {
  return (
    <div className="container mx-auto bg-white text-gray-800 py-12 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6 border-b-2 border-gray-200 pb-2">
          Giới thiệu về COSOVO
        </h1>

        <p className="text-lg leading-relaxed mb-6">
          COSOVO là thương hiệu đã đồng hành cùng thị trường Việt Nam gần 20
          năm, mang đến cho khách hàng sự uy tín, chất lượng và trải nghiệm mua
          sắm vượt trội.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Tất cả các sản phẩm tại COSOVO đều là hàng chọn chính hãng từ những
          thương hiệu lớn, đảm bảo chất lượng và độ tin cậy cao cho người sử
          dụng.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          Với phương châm phục vụ khách hàng tận tâm, hết mình, chúng tôi luôn
          nỗ lực mang lại cảm giác “sướng hơn gấp nhiều lần” thông qua từng sản
          phẩm mà COSOVO cung cấp.
        </p>

        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-black mb-3">
            Chính sách hậu mãi
          </h2>
          <p className="text-lg leading-relaxed">
            Nếu sản phẩm không đạt yêu cầu, COSOVO sẵn sàng xin lỗi và:
          </p>
          <ul className="list-disc list-inside text-lg mt-2 space-y-1">
            <li>Đổi mới sản phẩm khác.</li>
            <li>Hoặc hoàn tiền 100% cho khách hàng.</li>
          </ul>
        </div>

        <p className="text-lg leading-relaxed italic">
          COSOVO xin chân thành cảm ơn anh em rất nhiều vì đã luôn tin tưởng và
          ủng hộ chúng tôi trong suốt thời gian qua.
        </p>
      </div>
    </div>
  );
}
