<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { statusColors, postgresTimeToReadable } from '$lib';
  export let info;
  // export let data;
</script>

<Card class="w-full max-w-full">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.table.includes('equipment') || info.table.includes('venue') ? postgresTimeToReadable(info.date) : info.date}</p>
      <Badge class="mt-2" large border color='{info.status === 'approved' ? statusColors.approved : info.status === 'declined' ? statusColors.declined : statusColors.pending}'> {info?.status?.charAt(0).toUpperCase() + info?.status?.slice(1)} </Badge>
      <p class="text-xs mt-2 text-gray-400">Request created on {postgresTimeToReadable(info.created)}</p>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" >
      View
    </GradientButton>
  </div>
</Card>