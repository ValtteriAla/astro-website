<script>
    /*
    Maybe premade themes are better here instead of trying to make fully customizable, since
    there are not really that many skeleton types needed
    */
    export let className = "";
    export let basicText = false

    const defaultClass = "flex flex-col gap-4 w-52 " + className
</script>

{#if basicText}
<div class={defaultClass}>
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
</div>
{/if}