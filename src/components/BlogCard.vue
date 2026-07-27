<script setup>
import {ref} from 'vue'
const commentText = ref('')

const emit = defineEmits([
    "like",
    "collect",
    "comment"
])
const props = defineProps({
    title:String,
    date:String,
    desc:String,
    like:Number,
    collect:Boolean,
    comments:Array
})
function addLike(){
    emit("like")
}
function addCollect(){
    emit("collect")
}
function addComment(){
    if(!commentText.value.trim()){
        return
    }
    emit("comment",commentText.value)
    commentText.value=""
}
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
                    <button @click="addLike">点赞
                        {{ like}}
                    </button>
                    <br>
                  <button @click="addCollect">
                    {{ collect ? "已收藏" : "收藏"}}
                    </button>
                    </div>
                    <div>
                        <input 
                        v-model="commentText"
                        placeholder="请输入你的评论"
                        
                        >
                        <button @click="addComment">
                            发送
                            </button>
                            </div>
                            <div>
                                <p 
                                v-for="item in comments"
                                :key="item"
                                
                                >
                                {{ item }}
                                </p>
                                </div>
    </template>