<script>
    export let className
    export let title
    export let description
    export let link
    export let image = {src: ""}
    let defaultClass = "flex flex-1 min-w-72 flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] "
    
    if (className) {
        defaultClass += `${className}`
    }
</script>

<div class={defaultClass}>
  {#if image.src}
    <img
      class="w-full max-h-48 rounded-t-xl"
      src={image.src}
      alt="Blue glassy thing"
    />
    {/if}
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