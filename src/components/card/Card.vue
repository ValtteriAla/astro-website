<template>
      <div :class="defaultClass">

    <figure v-if="image.src"><img class="w-full max-h-48 rounded-t-xl" :src="image.src" alt="Shoes" /></figure>

  <div class="card-body">
    <h2 class="card-title">{{title}}</h2>
    <p>{{description}}</p>
    <div class="card-actions justify-center">
        <a
          v-if="link"
          class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          :href="link.href"
        >
          {{link.name}}
        </a>
    </div>
  </div>
</div>
  </template>
  
  <script setup>

  const props = defineProps({
    title: String,
    description: String,
    link: {href: String, name: String},
    className: String,
    image: {src: String},
    })

    let defaultClass = "flex flex-col p-5 bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] "
    
    if (props.className) {
        defaultClass += `${props.className}`
    }

  </script>