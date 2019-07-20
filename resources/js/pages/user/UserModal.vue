<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="userModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-text="item.id>0?'Kullanıcı Düzenle':'Yeni Kullanıcı'"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" v-if="errorMessage" v-html="errorMessage"></div>
                    <form @submit.prevent="true">
                        <div class="row form-group">
                            <label class="col-sm-3 col-form-label">Kullanıcı Adı</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="item.name">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 col-form-label">Şifre</label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control" v-model="item.password">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control" v-model="item.email">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" v-text="item.id>0?'Güncelle':'Kaydet'" @click="saveItem"></button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserModal",
        props: ['item'],
        data(){
            return{
                errorMessage: ''
            }
        },
        methods: {
            saveItem(){
                if(this.item.id>0){
                    axios.put('users/'+this.item.id, this.item)
                        .then(response => {
                            //console.log(response);
                            if(response.data.success){
                                //alert(response.data.message);
                                this.$emit('onSaved', this.item);
                                $('#userModal').modal('hide');
                                toastr.success(response.data.message, 'Kullanıcı');
                            }
                        })
                        .catch(error => {
                            //console.log(error);
                            this.errorMessage = error.response.data.message;
                            if (error.response.data.errors) {
                                this.errorMessage += '<ul>';
                                Object.keys(error.response.data.errors).forEach(key => {
                                    this.errorMessage += '<li>'+error.response.data.errors[key][0]+'</li>';
                                });
                                this.errorMessage += '</ul>';
                            }
                        });
                } else{
                    axios.post('users', this.item)
                        .then(response => {
                            //console.log(response);
                            if(response.data.success){
                                //alert(response.data.message);
                                this.$emit('onSaved', this.item);
                                $('#userModal').modal('hide');
                                toastr.success(response.data.message, 'Kullanıcı');
                            }
                        })
                        .catch(error => {
                            //console.log(error);
                            this.errorMessage = error.response.data.message;
                            if (error.response.data.errors) {
                                this.errorMessage += '<ul>';
                                Object.keys(error.response.data.errors).forEach(key => {
                                    this.errorMessage += '<li>'+error.response.data.errors[key][0]+'</li>';
                                });
                                this.errorMessage += '</ul>';
                            }
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>