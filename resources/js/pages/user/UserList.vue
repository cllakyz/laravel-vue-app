<template>
    <div>
        <button class="btn btn-primary float-right" @click="fetchData">Yenile</button>
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
    export default {
        name: "UserList",
        components: { Pagination },
        data(){
            return{
                list: [],
                errorMessage: null,
                meta: {}
            }
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData(page=1){
                this.list = [];
                this.errorMessage = null;
                axios.get(this.$parent.$data.api_url+'users', { params: {page}})
                    .then(response => {
                        this.list = response.data.data;
                        this.meta = response.data.meta;
                    }).catch(error => {
                        console.log(error);
                        this.errorMessage = error.response.data.message;
                    });
            }
        }
    }
</script>

<style scoped>

</style>