import axios from "axios";

// Lấy API từ biến môi trường, nếu không có thì mặc định là localhost
const API = process.env.VUE_APP_API_URL
  ? `${process.env.VUE_APP_API_URL}/api/nguoidung`
  : "http://localhost:8080/api/nguoidung";

export const dangKyNguoiDung = async (nguoiDung) => {
  const res = await axios.post(API, nguoiDung);
  return res.data;
};

export const dangNhapNguoiDung = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const capNhatNguoiDung = async (id, nguoiDung) => {
  const res = await axios.put(`${API}/${id}`, nguoiDung);
  return res.data;
};

export const xoaNguoiDung = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
