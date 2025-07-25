import axios from "axios";

// Đúng cú pháp: lấy trực tiếp biến môi trường khi build, không cần if
const API = "https://vueapibasic-production.up.railway.app/api/nguoidung";

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
