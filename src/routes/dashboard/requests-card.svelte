<script>
  import { Card, Button, Drawer, CloseButton, Badge, Gallery, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, IndentOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { equipmentReqName } from '$lib/stores';
  
  export let info;
  let status = info.admin_approve_layer
  let status_msg  = ['Approved', 'Pending Approval - Chair', 'Pending Approval - FIC', 'Pending Approval - Staff']
  let status_color = ['green', 'yellow', 'yellow', 'yellow']
</script>

<Card class="w-full max-w-full" href="#">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">{info.type}: {info.name}</h5>
      <p class="mt-2 text-gray-400">for {info.date}</p>
      <Badge class="mt-2" large border color='yellow'> Placeholder Status </Badge>
    </div>
    <GradientButton color="green" href="/dashboard/request-details/{info.table}-{info.id}" on:click={() => equipmentReqName.set(info.name)}>
      View
  </GradientButton>
  </div>
</Card>