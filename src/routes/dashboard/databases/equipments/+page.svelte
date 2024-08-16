<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { MultiSelect, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { DownloadSolid, FilterSolid, EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid, ChevronSortOutline } from 'flowbite-svelte-icons';
  import { downloadCSV } from '../downloadcsv';
  import { enhance } from '$app/forms';
  import toast from 'svelte-french-toast';

  let equipmentTypes = data.equipmentTypes;
  let equipments = data.equipments;
  let tableHead = []
  if (equipments != null){
    tableHead = Object.keys(equipments[0]);
  }
  // Add a 'value' & 'name' property to each object in the array (for Svelte each behavior)
  equipmentTypes = equipmentTypes.map((item) => ({ ...item, value: item.type, name: item.type }));
  equipmentTypes.push({type: 'Other...', value: 'other', name: 'Other...'});

  let addedEquipmentType = "";
  $: isOther = addedEquipmentType == "other";
  
  let access_level=data.current_user.access_level;
  
  let equipmentName="equipment"
  let EditModal = false;
  let DeleteModal = false;
  let AddModal = false;
  let editEquipment;

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get individual date components
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    // Get time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format date and time according to the desired format
    return `${month}/${day}/${year}  ${hours}:${minutes}`;
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
  let status = [
    { value: 'available', name: 'available' }, 
    { value: 'in use', name: 'in use' },
    { value: 'in repair', name: 'in repair' },
  ]

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

    /*-- toast logic --*/
    let loading = false

    const submitEquipment = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success("Equipment successfully added!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to add equipment.';
                    toast.error(errorMessage);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }
</script>
  
<div class="p-4 md:p-10">
  <div class="gap-2 w-full pb-5">
    <div class="flex flex-col md:flex-row gap-2 w-full items-start pb-2">
      <Search size="md" bind:value={searchQuery}/>
    </div>

    <div class="flex flex-row md:flex-row gap-2 pb-2 w-full">
      <span class="flex text-gray-700 gap-1 pr-1 items-center text-sm"><FilterSolid/>Filter:</span>
      <MultiSelect class="w-full md:w-1/2 bg-white text-gray-400 text-sm" placeholder="Type" items={type} bind:value={selectedType} />
      <MultiSelect class="w-full md:w-1/2 bg-white text-gray-400 text-sm" placeholder="Status" items={status} bind:value={selectedStatus} />
    </div>
    <hr>
  </div>
  
  <div class="flex flex-col md:flex-row items-center justify-between pb-5">
    <p class="font-semibold text-xl text-gray-700">Equipments Database</p>
    <div class="flex flex-row md:flex-row gap-2 mt-2 md:mt-0">
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
        {#each tableHead as head}
        {#if head != 'dateString' && head != 'id'} <!-- Exclude id from table headers -->
        <TableHeadCell>
          <button type='button' class="flex cursor-pointer" on:click={() => handleSort(head)}>
            {head}
            <ChevronSortOutline size='sm'/>
          </button>
        </TableHeadCell>
        {/if}
        {/each}
        <TableHeadCell></TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each equipments as equipment}
        <TableBodyRow>
          <!-- Remove ID cell -->
          <TableBodyCell>{equipment.name}</TableBodyCell>
          <TableBodyCell>{equipment.type}</TableBodyCell>
          <TableBodyCell>{equipment.location}</TableBodyCell>
          <TableBodyCell>{equipment.status}</TableBodyCell>
          <TableBodyCell>{equipment.notes}</TableBodyCell>
          <TableBodyCell>{formatDate(equipment.date_registered).toString()}</TableBodyCell>
          <TableBodyCell>
            <button on:click={() => {EditModal = true; editEquipment = equipment}}><EditOutline class="text-green-700 mr-2"/></button>
            <button on:click={() => {DeleteModal = true; equipmentName = equipment.name}}><TrashBinOutline class="text-red-700"/></button>
          </TableBodyCell>
        </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    {:else}
    <p class="content-center text-gray-500">No equipments in database</p>
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

<Modal title="Add Equipment" bind:open={AddModal} >
  <form class="space-y-5 mb-2" method="POST" action="?/addEquipment" use:enhance={submitEquipment}>
    <div class="mb-3">
      <Label class="block mb-1">Name</Label>
      <Input 
        name="name" 
        type="text" 
        id="name"
        placeholder="Enter a descriptive name for the equipment." 
        disabled={loading}
        required
      />
    </div>
    <div class="mb-3">
      <Label class="block mb-1">Type</Label>
      <Select
          name="type"
          id="type"
          items={equipmentTypes}
          bind:value={addedEquipmentType}
          disabled={loading}
          required
      />
    </div>
    <div class="mb-3">
        {#if isOther}
            <Label class="space-y-2">
                <span>New Equipment Type</span>
                <Input
                    disabled={!isOther}
                    type="text"
                    name="new_type"
                    placeholder="Please make sure that the equipment type you want doesn't already exist."
                    required
                />
            </Label>
        {/if}
    </div>
    <div class="mb-3">
      <Label class="block mb-1">Location</Label>
      <Input 
        name="location" 
        type="text" 
        id="location"
        placeholder="Enter the specific location/room of the equipment within the facility." 
        disabled={loading}
        required
      />
    </div>    
    <div class="mb-3">
      <Label class="block mb-1">Notes</Label>
      <Input name="notes" type="text" id="notes" placeholder="Enter addtl. comments about the equipment. Can be empty." disabled={loading} />
    </div>
    <div class="flex gap-5 justify-center">
      <Button type="submit" class="w-full" disabled={loading}>Confirm</Button>
      <Button 
        type="button" 
        class="bg-red-700 hover:bg-red-800" 
        disabled={loading} 
        on:click={() => AddModal = false}
      >
        Cancel
      </Button>
    </div>
  </form>
</Modal>