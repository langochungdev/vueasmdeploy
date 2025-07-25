<template>
  <div class="container mt-5">
    <div class="card mx-auto p-4" style="max-width: 500px" v-if="user">
      <div class="text-center mb-4">
        <img :src="anhHienThi" class="rounded-circle" style="width: 120px; height: 120px; object-fit: cover" />
        <div v-if="dangSua" class="mt-2">
          <input type="file" class="form-control" @change="chonAnh">
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Mã Người Dùng</label>
        <input type="text" class="form-control" v-model="form.maNguoiDung" disabled>
      </div>

      <div class="mb-3">
        <label class="form-label">Tên</label>
        <input type="text" class="form-control" v-model="form.ten" :disabled="!dangSua">
      </div>

      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="form.email" :disabled="!dangSua">
      </div>

      <div class="mb-3">
        <label class="form-label">Mật Khẩu</label>
        <input type="password" class="form-control" v-model="form.matKhau" :disabled="!dangSua">
      </div>

      <div class="mb-3">
        <label class="form-label d-block">Giới Tính</label>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" :disabled="!dangSua" :value="true" v-model="form.gioiTinh">
          <label class="form-check-label">Nam</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" :disabled="!dangSua" :value="false" v-model="form.gioiTinh">
          <label class="form-check-label">Nữ</label>
        </div>
      </div>

      <div class="text-center">
        <button v-if="!dangSua" class="btn btn-primary" @click="batDauSua">Chỉnh sửa</button>
        <div v-else>
          <button class="btn btn-success me-2" @click="luu">Lưu</button>
          <button class="btn btn-secondary" @click="huy">Hủy</button>
        </div>
      </div>

      <p class="text-center text-success mt-3">{{ thongBao }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { uploadAnh } from "@/services/postService"

const { state, capNhat } = useAuthStore()
const user = computed(() => state.nguoiDung)
const thongBao = computed(() => state.thongBao)

const form = reactive({
  maNguoiDung: '',
  ten: '',
  email: '',
  matKhau: '',
  gioiTinh: true,
  anhDaiDien: ''
})

const dangSua = ref(false)
const anhMacDinh = '/default.jpg'
const anhTamThoi = ref('') // Hiển thị ảnh tạm khi chọn file

const anhHienThi = computed(() => {
  if (anhTamThoi.value) {
    return anhTamThoi.value // Ưu tiên ảnh vừa chọn
  }
  if (form.anhDaiDien && form.anhDaiDien !== 'null' && form.anhDaiDien !== '') {
    return form.anhDaiDien.startsWith('http')
      ? form.anhDaiDien
      : `${location.origin}/${form.anhDaiDien}`
  }
  return anhMacDinh
})

const batDauSua = () => dangSua.value = true

const huy = () => {
  fillForm()
  dangSua.value = false
  anhTamThoi.value = ''
}

const luu = async () => {
  await capNhat({ ...form })
  dangSua.value = false
  anhTamThoi.value = ''
  window.location.reload()
}

const fillForm = () => {
  if (user.value) {
    form.maNguoiDung = user.value.maNguoiDung
    form.ten = user.value.ten
    form.email = user.value.email
    form.gioiTinh = user.value.gioiTinh
    form.anhDaiDien = user.value.anhDaiDien || ''
    form.matKhau = user.value.matKhau || ''
    anhTamThoi.value = ''
  }
}

const chonAnh = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  anhTamThoi.value = URL.createObjectURL(file) // Hiện ảnh ngay khi chọn
  const url = await uploadAnh(file)
  form.anhDaiDien = url
  anhTamThoi.value = '' // Khi đã upload xong, reset, anhHienThi sẽ lấy form.anhDaiDien
}

onMounted(() => {
  fillForm()
})
</script>
