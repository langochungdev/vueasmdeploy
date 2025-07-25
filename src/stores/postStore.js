import { ref } from "vue";
import {
  getTatCaBaiViet,
  getBaiVietTheoNguoiDung, // Đã bổ sung API này trong service
  themBaiViet,
  suaBaiViet,
  xoaBaiViet,
  guiBinhLuan,
  getTatCaBinhLuan,
} from "@/services/postService";

export const usePostStore = () => {
  const danhSach = ref([]);
  const thongBao = ref("");
  const binhLuanList = ref([]);

  // Lấy tất cả bài viết
  const taiTatCaBaiViet = async () => {
    try {
      danhSach.value = await getTatCaBaiViet();
    } catch (err) {
      thongBao.value = "Không thể tải bài viết";
    }
  };

  // Lấy bài viết theo mã người dùng (API backend đã hỗ trợ)
  const taiBaiViet = async () => {
    try {
      const maNguoiDung = JSON.parse(
        localStorage.getItem("nguoiDung")
      )?.maNguoiDung;
      if (!maNguoiDung) {
        thongBao.value = "Không có mã người dùng";
        return;
      }
      danhSach.value = await getBaiVietTheoNguoiDung(maNguoiDung);
    } catch (err) {
      thongBao.value = "Không thể tải bài viết";
    }
  };

  // Thêm bài viết
  const them = async (bv) => {
    try {
      await themBaiViet(bv);
      thongBao.value = "Đã thêm bài viết";
      await taiBaiViet();
    } catch (err) {
      thongBao.value = "Thêm thất bại";
    }
  };

  // Sửa bài viết
  const sua = async (bv) => {
    try {
      const id = bv.id || bv.maBaiViet;
      await suaBaiViet(id, bv);
      thongBao.value = "Đã cập nhật bài viết";
      await taiBaiViet();
    } catch (err) {
      thongBao.value = "Sửa thất bại";
    }
  };

  // Xóa bài viết
  const xoa = async (maBaiViet) => {
    try {
      await xoaBaiViet(maBaiViet);
      thongBao.value = "Đã xóa bài viết";
      await taiBaiViet();
    } catch (err) {
      thongBao.value = "Xóa thất bại";
    }
  };

  // Lấy tất cả bình luận, filter theo bài viết phía frontend
  const taiBinhLuan = async (maBaiViet) => {
    const tatCa = await getTatCaBinhLuan();
    binhLuanList.value = tatCa.filter(
      (bl) => bl.baiViet?.maBaiViet === maBaiViet
    );
  };

  // Gửi bình luận
  const gui = async (noiDung, maBaiViet, maNguoiDung) => {
    const bl = {
      noiDung,
      ngayTao: new Date(),
      maBinhLuan: "BL" + Date.now(),
      baiViet: { maBaiViet },
      maNguoiDung,
    };
    await guiBinhLuan(bl);
    await taiBinhLuan(maBaiViet);
  };

  return {
    danhSach,
    thongBao,
    binhLuanList,
    taiTatCaBaiViet,
    taiBaiViet,
    them,
    sua,
    xoa,
    taiBinhLuan,
    gui,
  };
};
