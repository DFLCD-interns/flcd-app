<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { statusColors, postgresTimeToReadable } from '$lib';
  export let info;
  export let data;
  export let form;
  const isAdmin = data?.current_user?.access_level < 5; 
  

</script> 

<Card class="w-full max-w-full">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.table.includes('equipment') || info.table.includes('venue') ? postgresTimeToReadable(info.date) : info.date}</p>
      <Badge class="mt-2" large border color='{info?.status === 'approved' ? statusColors.approved : info.status === 'declined' ? statusColors.declined : statusColors.pending}'> {info?.status?.charAt(0).toUpperCase() + info?.status?.slice(1)} </Badge>
      <p class="text-xs mt-2 text-gray-400">Request created on {postgresTimeToReadable(info.created)}</p>
    </div>
    <div class="flex grid mr-4"> 
      <GradientButton class="{isAdmin ? '' : 'mb-1'}" color="green" href="/dashboard/request-details/{info.table}-{info.id}" >
        View
      </GradientButton>
      {#if !isAdmin}
      <form bind:this={form} action="?/deleteRequest" method="POST">
        <input hidden="true" id="request_table_name" name="request_table_name" />
        <input hidden="true" id="request_id" name="request_id" />
        <GradientButton color="red" type="submit" on:click={() => {
              form.querySelector(`input[id="request_table_name"]`).value = info.table;
              form.querySelector(`input[id="request_id"]`).value = info.id;
            }} >
          Delete
        </GradientButton>
      </form>
      {/if}
    </div>
  </div>
</Card>