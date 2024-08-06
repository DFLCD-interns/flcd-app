<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid } from 'flowbite-svelte-icons';

  console.log('d:', data)
  console.log('v:', data.venues)

  let venues = data.venue;

  let tableHead = Object.keys(venues[0]);

  let venueName="venue"

  let EditModal = false;
  let DeleteModal=false;
  let AddModal = false;

  let editVenue;
</script>
  
<div class="p-10">
  <form class="flex gap-2 pb-5">
    <Search size="md" />
    <GradientButton color="green" class="!p-2.5">
      <SearchOutline class="w-6 h-6" />
    </GradientButton>
  </form>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Venues Database</p>
    <GradientButton on:click={() => {AddModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Venue</GradientButton>
  </div>
  <div class="pb-5">
  <Table shadow>
    <TableHead>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      {#each tableHead as head}
      <TableHeadCell>{head}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each venues as venue}
      <TableBodyRow>
        <TableBodyCell>
          <button on:click={() => {EditModal = true; editVenue = venue}}><EditOutline  class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>
          <button on:click={() => {DeleteModal = true; venueName = venue.name}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>{venue.id}</TableBodyCell>
        <TableBodyCell>{venue.name}</TableBodyCell>
        <TableBodyCell>{venue.description}</TableBodyCell>
        <TableBodyCell>{venue.created}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  </div>
  
</div>

<Modal title="Edit Venue Details" bind:open={EditModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input value={editVenue.name} />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Type</Label>
      <Input value={editVenue.description} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Location</Label>
    <Input value={editVenue.created} />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Delete {venueName} from database?" bind:open={DeleteModal} autoclose>
  <div class="flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Add Venue" bind:open={AddModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input placeholder="Venue name" />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Description</Label>
      <Input placeholder="Venue type" />
  <div class="mb-6">
    <Label class="block mb-2">Date Created</Label>
    <Input type="datetime-local"/>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>