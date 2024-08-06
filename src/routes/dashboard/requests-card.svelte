<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { equipmentReqName } from '$lib/stores';
  import { page } from '$app/stores';
  export let info;
  export let data;
  let isAdmin = (data.current_user.access_level < 5);
 
  //let status = info.admin_approve_layer
  let status_msg  = ['Approved', 'Pending Approval - Chair', 'Pending Approval - FIC', 'Pending Approval - Staff']
  let status_color = ['green', 'yellow', 'yellow', 'yellow']
  // console.log(`from info: ${info}`)
</script>

<Card class="w-full max-w-full" href="#">
  {#if isAdmin}
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.date}</p>
      <Badge class="mt-2" large border color='yellow'> {info.status} </Badge>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" on:click={() => equipmentReqName.set(info.name)}>
      View
  </GradientButton>
  </div>
  {:else}
    <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">Equipment: {#each info as eq} {eq.name} {/each}</h5>
      <p class="mt-2 text-gray-400">for {info[0].created}</p>
      <Badge class="mt-2" large border color='yellow'> Placeholder Status </Badge>
    </div>
  </div>
  {/if}
</Card>