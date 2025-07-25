import axios from "axios";

// Luôn lấy baseURL từ biến môi trường khi build
const BASE_API = "https://vueapibasic-production.up.railway.app/api";

const API = `${BASE_API}/baiviet`;
const BINHLUAN_API = `${BASE_API}/binhluan`;

// Upload ảnh lên Cloudinary qua API backend
export const uploadAnh = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${BASE_API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data; // link ảnh Cloudinary
};

// Lấy tất cả bài viết
export const getTatCaBaiViet = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Lấy tất cả bài viết của 1 người dùng
export const getBaiVietTheoNguoiDung = async (maNguoiDung) => {
  const res = await axios.get(`${API}?maNguoiDung=${maNguoiDung}`);
  return res.data;
};

// Lấy bài viết theo id
export const getBaiVietById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// Thêm bài viết mới
export const themBaiViet = async (bv) => {
  const res = await axios.post(API, bv);
  return res.data;
};

// Sửa bài viết
export const suaBaiViet = async (id, bv) => {
  const res = await axios.put(`${API}/${id}`, bv);
  return res.data;
};

// Xóa bài viết
export const xoaBaiViet = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// Thêm bình luận
export const guiBinhLuan = async (bl) => {
  const res = await axios.post(BINHLUAN_API, bl);
  return res.data;
};

// Lấy tất cả bình luận
export const getTatCaBinhLuan = async () => {
  const res = await axios.get(BINHLUAN_API);
  return res.data;
};

// Lấy bình luận theo id
export const getBinhLuanById = async (id) => {
  const res = await axios.get(`${BINHLUAN_API}/${id}`);
  return res.data;
};
