<script>
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline } from 'flowbite-svelte-icons';
  let venues = [
    {
      name:"venue 1"
    },
    {
      name:"venue 2"
    }
  ]

  let EditModal = false;
  let DeleteModal=false;

  let Info = [];

  function Edit(a){
      Info=[a];
      EditModal = true;
  }

  function Delete(a){
      Info=[a];
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
      <TableHeadCell></TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each venues as venue}
      <TableBodyRow>
        <TableBodyCell>{venue.name}</TableBodyCell>
        <TableBodyCell class="flex justify-between">
          <button on:click={() => Edit(venue.name)}><EditOutline  class="text-green-600"/></button>
          <button on:click={() => Delete(venue.name)}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  </div>
  <div class="flex gap-3 justify-center">
    <Input class="w-[40%] " type="text" id="first_name" placeholder="Enter Venue Name" required />
    <GradientButton color="green" class="inline-flex text-center">Add Venue</GradientButton>
  </div>
</div>

<Modal title="Edit Equipment Details" bind:open={EditModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input placeholder={Info[0]} />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Delete Venue from Database?" bind:open={DeleteModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name: {Info[0]}</Label>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>