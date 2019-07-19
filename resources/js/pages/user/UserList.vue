<template>
    <div>
        <user-modal v-bind:item="item" v-on:onSaved="refreshData"></user-modal>
        <div class="btn-group float-right">
            <button class="btn btn-primary" @click="fetchData">Yenile</button>
            <button class="btn btn-success" @click="createData">Yeni Kullanıcı</button>
        </div>

        <h1>Kullanıcılar</h1>
        <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
        </div>
        <table class="table table-bordered table-hover" v-if="list.length">
            <tr>
                <td>Id</td>
                <td>Ad Soyad</td>
                <td>Email</td>
            </tr>
            <tr v-for="{id, name, email} in list">
                <td>{{ id }}</td>
                <td>{{ name }}</td>
                <td>{{ email }}</td>
            </tr>
        </table>
        <p v-else>Kayıt bulunamadı...</p>
        <pagination :meta="meta" v-on:pageChange="fetchData" />
    </div>
</template>

<script>
    import Pagination from '../../components/Pagination';
    import UserModal from './UserModal';
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
                axios.get('users', { params: {page}})
                    .then(response => {
                        this.list = response.data.data;
                        this.meta = response.data.meta;
                    }).catch(error => {
                        console.log(error);
                        this.errorMessage = error.response.data.message;
                    });
            },
            createData(){
                this.item = {};
                $('#userModal').modal('show');
            },
            refreshData(item){
                this.fetchData();
            }
        }
    }
</script>

<style scoped>

</style>