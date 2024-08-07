<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { statusColors } from '$lib';
  export let info;
  export let data;
  const isAdmin = (data.current_user.access_level < 5);
 </script>

<Card class="w-full max-w-full" href="#">
  {#if isAdmin}
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.date}</p>
      <Badge class="mt-2" large border color='{info.status === 'approved' ? statusColors.approved : info.status === 'declined' ? statusColors.declined : statusColors.pending}'> {info.status.charAt(0).toUpperCase() + info.status.slice(1)} </Badge>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" >
      View
  </GradientButton>
  </div>
  {:else}
    <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">Equipment: {#each info as eq} {eq.name} {/each}</h5>
      <p class="mt-2 text-gray-400">for {info[0]?.created}</p>
      <Badge class="mt-2" large border color='yellow'> Placeholder Status </Badge>
    </div>
  </div>
  {/if}
</Card>