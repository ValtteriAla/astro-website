<script>
    export let className
    export let title
    export let description
    export let link
    let defaultClass = "flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] "
    
    if (className) {
        defaultClass += `${className}`
    }
</script>

<div class={defaultClass}>
    <img
      class="w-full h-auto rounded-t-xl"
      src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
      alt="Blue glassy thing"
    />
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
      <p class="mt-1 text-gray-500 dark:text-gray-400">
         {description}
      </p>

      {#if link}
      <a
        class="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        href={link.href}
      >
        {link.name}
      </a>
      {/if}

    </div>
</div>