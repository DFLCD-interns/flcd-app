<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import { statusColors } from '$lib';
  export let info;
  export let data;
</script>

<Card class="w-full max-w-full" href="#">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.date}</p>
      <Badge class="mt-2" large border color='{info.status === 'approved' ? statusColors.approved : info.status === 'declined' ? statusColors.declined : statusColors.pending}'> {info?.status?.charAt(0).toUpperCase() + info?.status?.slice(1)} </Badge>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" >
      View
    </GradientButton>
  </div>
</Card>