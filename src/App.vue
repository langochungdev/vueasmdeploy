<template>
    <div class="d-flex flex-column min-vh-100">
        <!-- header -->
        <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">Trang Blog</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo2">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse show" id="navbarTogglerDemo2">
                    <ul class="navbar-nav me-auto mb-2 mb-xl-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Trang chủ</router-link>
                        </li>
                        <li class="nav-item" v-if="daDangNhap">
                            <router-link class="nav-link" to="/dangbai">Đăng bài</router-link>
                        </li>
                    </ul>
                    <div class="d-flex align-items-center">
                        <!-- ✅ Input tìm kiếm liên kết với searchStore -->
                        <input type="text" class="form-control me-3" placeholder="Tìm kiếm bài viết..."
                            style="width: 250px" v-model="searchStore.tuKhoa" />

                        <router-link v-if="daDangNhap" to="/hoso" class="me-2">
                            <img :src="avatarNguoiDung" alt="Avatar" class="rounded-circle"
                                style="width: 40px; height: 40px; object-fit: cover" />
                        </router-link>

                        <button v-if="daDangNhap" class="btn btn-outline-light me-2" @click="dangXuatVaVeTrangChu">
                            Đăng xuất
                        </button>

                        <router-link v-if="!daDangNhap" class="btn btn-outline-light me-2" to="/dangky">
                            Đăng ký
                        </router-link>
                        <router-link v-if="!daDangNhap" class="btn btn-outline-light" to="/dangnhap">
                            Đăng nhập
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>

        <div class="flex-grow-1">
            <router-view />
        </div>

        <footer class="bg-dark text-light text-center py-3">
            <div>© 2025 Trang Blog - Bản quyền thuộc về nhóm bạn</div>
        </footer>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { useSearchStore } from '@/stores/searchStore' 

const { state, dangXuat } = useAuthStore()
const searchStore = useSearchStore()
const router = useRouter()

const daDangNhap = computed(() => !!state.nguoiDung)

const avatarNguoiDung = computed(() => {
    const anh = state.nguoiDung?.anhDaiDien
    if (!anh || anh === 'null' || anh === '') return 'http://localhost:8080/asmvue/uploaded/avt.png'
    if (anh.startsWith('http')) return anh
    return anh.startsWith('/') ? 'http://localhost:8080' + anh : 'http://localhost:8080/' + anh
})

const dangXuatVaVeTrangChu = () => {
    dangXuat()
    router.push('/')
}
</script>
