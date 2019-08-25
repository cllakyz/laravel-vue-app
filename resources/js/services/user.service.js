import ApiService from './api.service';

const resource = 'users';
export default {
    GetByPage(page){
        return ApiService.get(resource, { params: {page}});
    },
    GetById(id){
        return ApiService.get(resource+'/'+id);
    },
    DeleteById(id){
        return ApiService.delete(resource+'/'+id);
    },
    Save(item){
        if(item.id > 0){
            return ApiService.put(resource+'/'+item.id, item);
        } else{
            return ApiService.post(resource, item);
        }
    }
}
