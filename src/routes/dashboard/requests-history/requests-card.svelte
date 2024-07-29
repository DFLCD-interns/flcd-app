<script>
  import { Card, Button, Drawer, CloseButton, Badge, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  export let info;
</script>

<Card class="w-full max-w-full" href="#">
  <div class="flex items-center justify-between">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">Equipment Request: {info.material}</h5>
      <p class="mt-2 text-gray-400">for August 24, 2024</p>
      <Badge class="mt-2" large border color='green'> Accepted </Badge>
    </div>
    <GradientButton color="green" href="/dashboard/request-details-{info.reqid}">
        View
    </GradientButton>
  </div>
  </Card>