<script>
  import { getTest } from "@scripts/test";
  import Skeleton from "@components/Skeletons.svelte";
  import { createClient } from "@supabase/supabase-js";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  let chatMessage = "";
  let pageVisitChannel = null;
  let supabase = null;

  const SUPABASE_URL = "https://anfdvbmbbfwchgnwtzhh.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZmR2Ym1iYmZ3Y2hnbnd0emhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NDI5MzUsImV4cCI6MjAyODMxODkzNX0.EzRrK0pr4LjSopqLB24lkFszIQXE1VVs25EKewxE64w";

  let createConnection = true;
  if (createConnection) {
    const userStatus = {
      user: `user-${generateString(4)}`,
      online_at: new Date().toISOString(),
    };

    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    pageVisitChannel = supabase.channel("page-visit");
    console.log("hm");

    pageVisitChannel
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "Test" },
        handleUpdate
      )
      .on("broadcast", { event: "message" }, (payload) =>
        messageReceived(payload)
      )
      .on("presence", { event: "sync" }, () => {
        const newState = pageVisitChannel.presenceState();
        console.log("sync", newState);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        const presenceTrackStatus = await pageVisitChannel.track(userStatus);
        console.log(presenceTrackStatus);
      });

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
    if (pageVisitCount) return `--value:${pageVisitCount};`;
    return `--value:${response.data[0].page_visit_count};`;
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
    <div>
      Page visit count: <span class="countdown font-mono text-2xl">
        <span style={getPageVisitCount(response, pageVisitCount)}></span>
      </span>
    </div>
    {JSON.stringify(response.data, undefined, 2)}
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
