<template>
    <div>
        <user-modal v-bind:item="item" v-on:onSaved="refreshData" ref="userModal"></user-modal>
        <div class="btn-group float-right">
            <button class="btn btn-info" @click="fetchData">Yenile</button>
            <button class="btn btn-success" @click="createData">Yeni Kullanıcı</button>
        </div>

        <h1>Kullanıcılar</h1>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
        <table class="table table-bordered table-hover" v-if="list.length">
            <thead>
            <tr>
                <th>Id</th>
                <th>Ad Soyad</th>
                <th>Email</th>
                <th>İşlem</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="{id, name, email} in list">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td>{{ email }}</td>
                <td>
                    <button class="btn btn-success" @click="editData(id)">Düzenle</button>
                    <button class="btn btn-danger" @click="deleteData(id)">Sil</button>
                </td>
            </tr>
            </tbody>
        </table>
        <p v-else>Kayıt bulunamadı...</p>
        <pagination :meta="meta" v-on:pageChange="fetchData" />
    </div>
</template>

<script>
    import Pagination from '../../components/Pagination';
    import UserModal from './UserModal';
    import UserService from '../../services/user.service';

    export default {
        name: "UserList",
        components: {Pagination, UserModal},
        data(){
            return{
                list: [],
                errorMessage: null,
                meta: {},
                item: {}
            }
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData(page=1){
                this.list = [];
                this.errorMessage = null;
                UserService.GetByPage(page)
                    .then(response => {
                        this.list = response.data.data;
                        this.meta = response.data.meta;
                    });
            },
            createData(){
                this.item = {};
                this.$refs.userModal.errorMessage = '';
                $('#userModal').modal('show');
            },
            refreshData(item){
                this.fetchData();
            },
            editData(id){
                UserService.GetById(id)
                    .then(response => {
                        //console.log(response.data);
                        this.$refs.userModal.errorMessage = '';
                        this.item = response.data;
                        $('#userModal').modal('show');
                    });
            },
            deleteData(id){
                swal.fire({
                    title: 'Emin misiniz?',
                    text: 'Bu kullanıcıyı kalıcı olarak silmek istediğinize emin misiniz?',
                    type: 'warning',
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelButtonText: 'İptal',
                    confirmButtonText: 'Evet, Sil!'
                }).then(result => {
                    if (result.value){
                        UserService.DeleteById(id)
                            .then(response => {
                                this.fetchData();
                                toastr.success(response.data.message, 'Kullanıcı');
                            });
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
