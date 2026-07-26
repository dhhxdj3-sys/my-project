<script setup>
const props = defineProps({
    title:String,
    date:String,
    desc:String
})
</script>
<template>
    <div class="card">
        <h2>
            {{ title }}
            </h2>
            <p>
                {{ date }}
                </p>
                <p>
                    {{ desc }}
                    </p>
                    </div>
    </template>