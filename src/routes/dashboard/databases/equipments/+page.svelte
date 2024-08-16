<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { MultiSelect, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { DownloadSolid, FilterSolid, EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid, ChevronSortOutline } from 'flowbite-svelte-icons';
  import { downloadCSV } from '../downloadcsv';
  let equipments = data.equipments;
  let tableHead = []
  if (equipments != null){
    tableHead = Object.keys(equipments[0]);
  }
  
  let access_level=data.current_user.access_level;
  

  let equipmentName="equipment"

  let EditModal = false;
  let DeleteModal=false;
  let AddModal = false;

  let editEquipment;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const optionsDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // AM/PM format
    };

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate} at ${formattedTime}`;
  }

  equipments.forEach(item => {
    item.dateString = formatDate(item.date_registered) // or use another format if preferred
  });

  let searchQuery='';
  let selectedType = [];
  let type = data.equipmentTypes.map(item => ({
    value: item.type,
    name: item.type
  }));

  let selectedStatus = [];
  let status = [{ value: 'available', name: 'available' }, { value: 'unavailable', name: 'unavailable' }]

  $: equipments = data.equipments
    .filter(item => 
      selectedType.length === 0 || selectedType.includes(item.type)
    )
    .filter(item => 
      selectedStatus.length === 0 || selectedStatus.includes(item.status)
    )
    .filter(item =>
      searchQuery === '' || Object.values(item).some(value =>
        // Search all string fields
        typeof value === 'string' && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

      let sortDirection = 'asc'; // Default sort direction
      let column='id';
      function handleSort(column) {
        equipments = equipments.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Sort strings alphabetically
          if (sortDirection === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        } else if (column === 'dateString'){
          if (sortDirection === 'asc') {
            return a[date_created] - b[date_created];
          } else {
            return b[date_created] - a[date_created];
          }
        } else {
        // Sort numbers numerically
          if (sortDirection === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }}
      });
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }

</script>
  
<div class="p-10">
  <div class="gap-2 w-full pb-5">
    <div class="flex gap-2 w-full items-start pb-2">
      <Search size="md" bind:value={searchQuery}/>
    </div>

    <div class="flex gap-2 pb-2  w-full">
      <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select type" items={type} bind:value={selectedType} />
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select status" items={status} bind:value={selectedStatus} />
    </div>
    <hr>
  </div>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Equipments Database</p>
    <div class = "flex gap-2">
    <GradientButton on:click={downloadCSV(equipments, 'equipment')} color="green" class="inline-flex text-center gap-2"><DownloadSolid/>Download Table</GradientButton>
    {#if access_level !=4}
    <GradientButton on:click={() => {AddModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Equipment</GradientButton>
    {/if}
  </div>
  </div>
  <div class="pb-5">
  {#if equipments != null}
  <Table shadow>
    <TableHead>
      {#if access_level != 4}
      <TableHeadCell></TableHeadCell>
      <TableHeadCell></TableHeadCell>
      {/if}
      {#each tableHead as head}
      {#if head != 'dateString'}
      <TableHeadCell>
        <button type='button' class="flex cursor-pointer" on:click={() => handleSort(head)}>
          {head}
          <ChevronSortOutline size='sm'/>
        </button>
      </TableHeadCell>
      {/if}
      {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each equipments as equipment}
      <TableBodyRow>
        {#if access_level != 4}
        <TableBodyCell>
          <button on:click={() => {EditModal = true; editEquipment = equipment}}><EditOutline  class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>
          <button on:click={() => {DeleteModal = true; equipmentName = equipment.name}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        {/if}
        <TableBodyCell>{equipment.id}</TableBodyCell>
        <TableBodyCell>{equipment.name}</TableBodyCell>
        <TableBodyCell>{equipment.type}</TableBodyCell>
        <TableBodyCell>{equipment.location}</TableBodyCell>
        <TableBodyCell>{equipment.status}</TableBodyCell>
        <TableBodyCell>{equipment.notes}</TableBodyCell>
        <TableBodyCell>{formatDate(equipment.date_registered).toString()}</TableBodyCell>
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
    <Input value={editEquipment.date_registered} onfocus="(this.type='date')" onblur="(this.type='text')"/>
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
  <div class="mb-5">
      <Label class="block mb-1">Name</Label>
      <Input placeholder="Equipment name" />
  </div>
  <div class="mb-5">
      <Label class="block mb-1">Type</Label>
      <Input placeholder="Equipment type" />
  </div>
  <div class="mb-5">
    <Label class="block mb-1">Location</Label>
    <Input placeholder="Equipment location" />
  </div>
  <div class="mb-5">
    <Label class="block mb-1">Notes</Label>
    <Input placeholder="Enter notes" />
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>