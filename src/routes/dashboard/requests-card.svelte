<script>
  import { Card, Button, Drawer, CloseButton, Badge } from 'flowbite-svelte';
  import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  export let info;
  let status = info[0].admin_approve_layer
  let status_msg  = ['Approved', 'Pending Approval - Chair', 'Pending Approval - FIC', 'Pending Approval - Staff']
  let status_color = ['green', 'yellow', 'yellow', 'yellow']
</script>

<Card class="w-full max-w-full" href="#">
    <div class="mb-2">
      <h5 class="text-xl font-semibold text-black">Equipment Request: {#each info as eqs} {eqs.name}, {/each}</h5>
      <p class="mt-2 text-gray-400">for {info[0].request_time}</p>
      <Badge class="mt-2" large border color={status_color[status - 1]}> {status_msg[status - 1]} </Badge>
    </div>
  </Card>