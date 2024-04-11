<script>
  export let className;
  export let title;
  export let description;
  export let link;
  export let image = { src: "" };
  let defaultClass = "card w-96 bg-base-100 shadow-xl ";

  if (className) {
    defaultClass += `${className}`;
  }
</script>

<div class={defaultClass}>
  {#if image.src}
    <figure><img class="w-full max-h-48 rounded-t-xl" src={image.src} alt="Shoes" /></figure>
  {/if}
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{description}</p>
    <div class="card-actions justify-center">
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
</div>
