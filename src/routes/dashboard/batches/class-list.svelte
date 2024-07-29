<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline } from 'flowbite-svelte-icons';
  export let S;
  let editChild = false;
  let DeleteModal=false;

  let childInfo = [];

  function edit(a, b){
      childInfo=[a, b];
      editChild = true;
      console.log(childInfo)
  }

  function Delete(a, b){
      childInfo=[a, b];
      DeleteModal = true;
      console.log(childInfo)
  }
</script>

<div>
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
      <TableHeadCell>Tracking ID</TableHeadCell>
      <TableHeadCell></TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each S as s}
      <TableBodyRow>
        <TableBodyCell>{s.Name}</TableBodyCell>
        <TableBodyCell>{s.TrackingID}</TableBodyCell>
        <TableBodyCell class="flex justify-between">
          <button on:click={() => edit(s.Name, s.TrackingID)}><EditOutline  class="text-green-600"/></button>
          <button on:click={() => Delete(s.Name, s.TrackingID)}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  </div>
  <div class="flex gap-3 justify-center">
    <Input class="w-[40%] " type="text" id="first_name" placeholder="Enter Name" required />
    <Input class="w-[40%] " type="text" id="first_name" placeholder="Enter Tracking ID" required />
    <GradientButton color="green" class="inline-flex text-center">Add Child</GradientButton>
  </div>
</div>

<Modal title="Edit Child Details" bind:open={editChild} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input placeholder={childInfo[0]} />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Tracking ID</Label>
      <Input placeholder={childInfo[1]} />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Delete Child from Database?" bind:open={DeleteModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name: {childInfo[0]}</Label>
      <Label class="block mb-2">Tracking ID: {childInfo[1]}</Label>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>