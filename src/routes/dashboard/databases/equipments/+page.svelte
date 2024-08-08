<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid } from 'flowbite-svelte-icons';

  let equipments = data.equipment;
  let tableHead = []
  if (equipments.length === 0){
    equipments =[]
  } else {
    tableHead = Object.keys(equipments[0]);
  }
  

  let equipmentName="equipment"

  let EditModal = false;
  let DeleteModal=false;
  let AddModal = false;

  let editEquipment;
</script>
  
<div class="p-10">
  <form class="flex gap-2 pb-5">
    <Search size="md" />
    <GradientButton color="green" class="!p-2.5">
      <SearchOutline class="w-6 h-6" />
    </GradientButton>
  </form>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Equipments Database</p>
    <GradientButton on:click={() => {AddModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Equipment</GradientButton>
  </div>
  <div class="pb-5">
  {#if equipments.length != 0 }
  <Table shadow>
    <TableHead>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      {#each tableHead as head}
      <TableHeadCell>{head}</TableHeadCell>
      {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each equipments as equipment}
      <TableBodyRow>
        <TableBodyCell>
          <button on:click={() => {EditModal = true; editEquipment = equipment}}><EditOutline  class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>
          <button on:click={() => {DeleteModal = true; equipmentName = equipment.name}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>{equipment.id}</TableBodyCell>
        <TableBodyCell>{equipment.name}</TableBodyCell>
        <TableBodyCell>{equipment.type}</TableBodyCell>
        <TableBodyCell>{equipment.location}</TableBodyCell>
        <TableBodyCell>{equipment.status}</TableBodyCell>
        <TableBodyCell>{equipment.notes}</TableBodyCell>
        <TableBodyCell>{equipment.date_registered}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  {:else}
  <p  class="content-center text-gray-500">No equipments in database</p>
  {/if}
  </div>
  
</div>

<Modal title="Edit Equipment Details" bind:open={EditModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input value={editEquipment.name} />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Type</Label>
      <Input value={editEquipment.type} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Location</Label>
    <Input value={editEquipment.location} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Status</Label>
    <Input value={editEquipment.status} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Notes</Label>
    <Input value={editEquipment.notes} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Date Registered</Label>
    <Input value={editEquipment.date_registered} />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Delete {equipmentName} from database?" bind:open={DeleteModal} autoclose>
  <div class="flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

<Modal title="Add Equipment" bind:open={AddModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input placeholder="Equipment name" />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Type</Label>
      <Input placeholder="Equipment type" />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Location</Label>
    <Input placeholder="Equipment location" />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Status</Label>
    <Input placeholder="Equipment status" />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Notes</Label>
    <Input placeholder="Enter notes" />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Date Registered</Label>
    <Input type="datetime-local"/>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>