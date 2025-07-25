<template>
    <div class="container mt-4">
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="mb-3">
                    <label class="form-label">Mã Bài Viết</label>
                    <input type="text" class="form-control" v-model="form.maBaiViet">
                </div>
                <div class="mb-3">
                    <label class="form-label">Tiêu Đề</label>
                    <input type="text" class="form-control" v-model="form.tieuDe">
                </div>
                <div class="mb-3">
                    <label class="form-label">Hình Ảnh</label>
                    <input type="file" class="form-control" @change="handleFile">
                    <input type="text" class="form-control mt-2" v-model="form.hinhAnh" @input="handleImage" placeholder="Hoặc dán link ảnh">
                </div>
            </div>
            <div class="col-md-6 d-flex justify-content-center align-items-center">
                <img :src="imageUrl || defaultImg" class="img-fluid rounded border"
                    style="max-height: 200px; object-fit: cover">
            </div>
        </div>
       
        <div class="mb-3">
            <label class="form-label">Nội Dung</label>
            <textarea class="form-control" rows="4" v-model="form.noiDung"></textarea>
        </div>

        <div class="mb-4">
            <button class="btn btn-primary me-2" @click="themMoi">Thêm</button>
            <button class="btn btn-danger me-2" @click="xoaBaiViet">Xóa</button>
            <button class="btn btn-warning me-2" @click="capNhat">Sửa</button>
            <button class="btn btn-secondary" @click="lamMoi">Làm Mới</button>
        </div>

        <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                    <th>Mã Bài Viết</th>
                    <th>Tiêu Đề</th>
                    <th>Nội Dung</th>
                    <th>Hình Ảnh</th>
                    <th>Ngày Tạo</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bv in danhSach" :key="bv.maBaiViet">
                    <td>{{ bv.maBaiViet }}</td>
                    <td>{{ bv.tieuDe }}</td>
                    <td>{{ bv.noiDung }}</td>
                    <td>
                        <img :src="getImageUrl(bv.hinhAnh)" style="height: 60px">
                    </td>
                    <td>{{ dinhDangNgay(bv.ngayTao) }}</td>
                    <td>
                        <button class="btn btn-sm btn-info" @click="chonBaiViet(bv)">Chỉnh sửa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="text-success text-center">{{ thongBao }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { uploadAnh } from "@/services/postService"

const { danhSach, thongBao, taiBaiViet, them, sua, xoa } = usePostStore()

const form = ref({
    maBaiViet: '',
    tieuDe: '',
    noiDung: '',
    hinhAnh: '',
    ngayTao: '',
    nguoiDung: null
})

const imageUrl = ref('')
const defaultImg = '/default.jpg'

// Preview ảnh mỗi khi nhập link
const handleImage = () => {
    imageUrl.value = getImageUrl(form.value.hinhAnh)
}

// Hàm upload file ảnh
const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = await uploadAnh(file)
    form.value.hinhAnh = url
    imageUrl.value = url
}

// Xử lý link ảnh: nếu là link http thì giữ nguyên, nếu là chuỗi rỗng/null thì lấy ảnh mặc định, nếu là tên file trả về đường dẫn backend
const getImageUrl = (img) => {
    if (!img || img === 'null') return defaultImg
    if (img.startsWith('http')) return img
    return 'http://localhost:8080/' + img
}

const themMoi = async () => {
    const nguoiDung = JSON.parse(localStorage.getItem('nguoiDung'))
    if (!nguoiDung) return
    form.value.ngayTao = new Date().toISOString()
    form.value.nguoiDung = { maNguoiDung: nguoiDung.maNguoiDung }
    await them({ ...form.value })
    await taiBaiViet()
    lamMoi()
}

const capNhat = async () => {
    if (!form.value.maBaiViet) return
    await sua({ ...form.value })
    await taiBaiViet()
    lamMoi()
}

const xoaBaiViet = async () => {
    if (!form.value.maBaiViet) return
    await xoa(form.value.maBaiViet)
    await taiBaiViet()
    lamMoi()
}

const chonBaiViet = (bv) => {
    form.value = { ...bv }
    imageUrl.value = getImageUrl(bv.hinhAnh)
}

const lamMoi = () => {
    form.value = {
        maBaiViet: '',
        tieuDe: '',
        noiDung: '',
        hinhAnh: '',
        ngayTao: '',
        nguoiDung: null
    }
    imageUrl.value = ''
}

const dinhDangNgay = (iso) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('vi-VN')
}

onMounted(() => {
    taiBaiViet()
})
</script>
