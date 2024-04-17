<script>
  import { getTest } from "@scripts/test";
  import Skeleton from "@components/Skeletons.svelte";
  import { createClient } from "@supabase/supabase-js";

  let chatMessage = "";
  let pageVisitChannel = null;
  let supabase = null;

  const SUPABASE_URL = "https://anfdvbmbbfwchgnwtzhh.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZmR2Ym1iYmZ3Y2hnbnd0emhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDI5MzUsImV4cCI6MjAyODMxODkzNX0.EzRrK0pr4LjSopqLB24lkFszIQXE1VVs25EKewxE64w";

  let createConnection = true;
  if (createConnection) {


    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    pageVisitChannel = supabase.channel("page-visit");

    pageVisitChannel
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Test" },
        handleUpdate
      )
      .on("broadcast", { event: "message" }, (payload) =>
        messageReceived(payload)
      )
      .subscribe();

    createConnection = false;
  }

  function messageReceived(event) {
    message = event.payload.message;
  }

  const dataPromise = getTest();
  $: message = null;

  $: pageVisitCount = null;

  function handleUpdate(e) {
    pageVisitCount = e.new.page_visit_count;
  }

  function getPageVisitCount(response, pageVisitCount) {
    if (pageVisitCount) return pageVisitCount
    return response.data[0].page_visit_count
  }

  function getChatBubbleClass(message) {
    let defaultClass =
      "chat chat-start opacity-0 animate-pulse-once " + message;
    setTimeout(() => {
      const el = document.getElementById("chat-bubble");
      el.classList.remove("animate-pulse-once");
    }, 3000);

    return defaultClass;
  }

  function onClickSendMessage() {
    if (!chatMessage || !pageVisitChannel) return;

    const channels = supabase.getChannels();
    console.log(channels);

    pageVisitChannel.send({
      type: "broadcast",
      event: "message",
      payload: { message: chatMessage },
    });

    chatMessage = "";
  }
</script>

<div>
  {#await dataPromise}
    <Skeleton basicText={true} />
  {:then response}

      <div class="stats shadow">
  
        <div class="stat">
          <div class="stat-title">Total Page Views</div>
          <div class="stat-value">{ getPageVisitCount(response, pageVisitCount)}</div>
        </div>
        
      </div>

      <div>{JSON.stringify(response.data, undefined, 2)}</div>

    
  {:catch err}
    Error: {JSON.stringify(err, undefined, 2)}
  {/await}
  <div class="min-h-20">
    {#if message}
      <div id="chat-bubble" class={getChatBubbleClass(message)}>
        <div class="chat-bubble">
          {message}
        </div>
      </div>
    {/if}
  </div>
  <div class="flex gap-2">
    <input
      bind:value={chatMessage}
      type="text"
      placeholder="Send message"
      class="input input-bordered w-full max-w-xs"
    />
    <button class="btn" on:click={onClickSendMessage}>Send</button>
  </div>
</div>
