<template>
    <div>
        <Navbar/>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar';
    export default {
        data(){
            return{
                api_url: 'http://dev.laravelvueapp.com/api/'
            }
        },
        components: {
            Navbar
        }
    }
</script>
