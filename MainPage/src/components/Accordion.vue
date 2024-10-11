<script setup>
defineProps({
    title: {
        type: String,
        require: true
    },
    content: {
        type: Array,
        require: true
    },
    id:{
        type: String,
        require: true
    }
}

)
</script>

<template>
    <div class="accordion accordion-flush" >
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#'+'flush-collapse-'+id"
                    aria-expanded="true"
                    :aria-controls="'flush-collapse-'+id"  
                >
                    <span class="fs-2">
                        {{title}}
                    </span>
                </button>
            </h2>
            <div
                :id="'flush-collapse-'+id"
                class="accordion-collapse collapse"
                
            >
                <div class="accordion-body">
                    <ul v-for="(item, index) in content" :key="index">
                        <li class="">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    .accordion{
        --bs-accordion-active-bg: inherit;
    }
    .accordion-button:focus{
        box-shadow: none;       
    }
    .accordion-button:not(.collapsed){
        box-shadow: none;
        color: inherit;
    }

</style>