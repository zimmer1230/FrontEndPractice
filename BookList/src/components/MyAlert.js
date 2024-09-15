
export default{
    setup(){
        return {props: ['message']};
    },
    template:`
    <div>
        <div class="alert alert-success" role="alert">{{ message }}</div>
        <br>
    </div>
    `
};
