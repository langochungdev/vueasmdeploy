import axios from "axios";

const API = "http://localhost:8080/api/nguoidung";

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
