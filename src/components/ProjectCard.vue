<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps({
    name:String,
    tech:String,
    desc:String,
    path:String
})
function goProject(){
    router.push(props.path)
}
</script>
<template>
    <div class="card">
        <h2>
            {{ name }}
            </h2>
            <p>
                技术:{{ tech }}
                </p>
                <p>
                    {{ desc }}
                    </p>
                    <button @click="goProject">
                        体验
                        </button>
                    </div>
    </template>