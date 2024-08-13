<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { statusColors } from '$lib';
  import { format } from 'date-fns';
  export let info;
  // export let data;
</script>

<Card class="w-full max-w-full">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.date}</p>
      <Badge class="mt-2" large border color='{info.status === 'approved' ? statusColors.approved : info.status === 'declined' ? statusColors.declined : statusColors.pending}'> {info?.status?.charAt(0).toUpperCase() + info?.status?.slice(1)} </Badge>
      <p class="text-xs mt-2 text-gray-400">request created on {format(new Date(info.created), 'MMMM d, yyyy \'at\' hh:mm a')}</p>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" >
      View
    </GradientButton>
  </div>
</Card>