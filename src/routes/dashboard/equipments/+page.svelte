<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline } from 'flowbite-svelte-icons';
  let equipments = [
    {
      name:"microphone",
      count:"1"
    },
    {
      name:"speaker",
      count:"1"
    }
  ]

  let EditModal = false;
  let DeleteModal=false;

  let Info = [];

  function Edit(a, b){
      Info=[a, b];
      EditModal = true;
  }

  function Delete(a, b){
      Info=[a, b];
      DeleteModal = true;
  }
</script>
  
<div class="p-10">
  <form class="flex gap-2 pb-5">
    <Search size="md" />
    <GradientButton color="green" class="!p-2.5">
      <SearchOutline class="w-6 h-6" />
    </GradientButton>
  </form>
  <div class="pb-5">
  <Table shadow>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Count</TableHeadCell>
      <TableHeadCell></TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each equipments as equipment}
      <TableBodyRow>
        <TableBodyCell>{equipment.name}</TableBodyCell>
        <TableBodyCell>{equipment.count}</TableBodyCell>
        <TableBodyCell class="flex justify-between">
          <button on:click={() => Edit(equipment.name, equipment.count)}><EditOutline  class="text-green-600"/></button>
          <button on:click={() => Delete(equipment.name, equipment.count)}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  </div>
  <div class="flex gap-3 justify-center">
    <Input class="w-[40%] " type="text" id="first_name" placeholder="Enter Equipment Name" required />
    <Input class="w-[40%] " type="text" id="first_name" placeholder="Enter Equimpment Count" required />
    <GradientButton color="green" class="inline-flex text-center">Add Equipment</GradientButton>
  </div>
</div>

<Modal title="Edit Equipment Details" bind:open={EditModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input placeholder={Info[0]} />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Tracking ID</Label>
      <Input placeholder={Info[1]} />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Delete Equipment from Database?" bind:open={DeleteModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name: {Info[0]}</Label>
      <Label class="block mb-2">Count: {Info[1]}</Label>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>