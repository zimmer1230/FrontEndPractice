<template>
    <div>
        <p> {{ msg }} </p>
    </div>
    <div class="container">
        <button type="button" class="btn  btn-primary"> Click me! </button>
    </div>

</template>

<script>
    export default{
        name: 'Ping',
        data(){
            return {msg: ''};
        },
        methods: {
            getMessage(){
                const path = 'http://localhost:5001/hello';
                fetch(path)
                .then( res=>res.json())
                .then( data=> this.msg = data )
                .catch( err => console.error(err) );
            }
        },
        created(){
            this.getMessage();
        }
    };

</script>