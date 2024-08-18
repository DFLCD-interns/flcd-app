<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { MultiSelect, Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { CheckOutline, CloseOutline, DownloadSolid, FilterSolid, EditOutline, TrashBinOutline, CirclePlusSolid, ChevronSortOutline } from 'flowbite-svelte-icons';
  import { downloadCSV } from '../downloadcsv';
  import { enhance } from '$app/forms';
  import toast from 'svelte-french-toast';

  let access_level=data.current_user.access_level;
  let equipmentTypes = data.equipmentTypes;
  let equipments = data.equipments;

  let tableHead = []
  if (equipments != null){
    tableHead = Object.keys(equipments[0]);
  }
  const headerNames = {
    name: 'Name',
    type: 'Type',
    location: 'Location',
    status: 'Status',
    notes: 'Notes',
    date_registered: 'Date Registered'
  }
  
  equipmentTypes = equipmentTypes.map((item) => ({ ...item, value: item.type, name: item.type }));
  equipmentTypes.push({type: 'Other...', value: 'other', name: 'Other...'});
  let addedEquipmentType = "";
  $: isOther = addedEquipmentType == "other";

  let DeleteModal = false;
  let AddModal = false;
  let editEquipment;
  let editingRowIndex = -1;
  let eq; // deleteEquipment

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year}  ${hours}:${minutes}`;
  }
  equipments.forEach(item => {
    item.dateString = formatDate(item.date_registered)
  });

  let searchQuery='';
  let selectedType = [];
  let type = data.equipmentTypes.map(item => ({
    value: item.type,
    name: item.type
  }));

  let selectedStatus = [];
  const status = [
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

    function editRow(row) {
      editEquipment = {...row};
      editingRowIndex = row.id;
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
    const deleteEquipment = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    DeleteModal = false;
                    toast.success("Equipment deleted successfully!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to delete equipment.';
                    toast.error(errorMessage);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }
    const saveChanges = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    editingRowIndex = -1;
                    toast.success("Changes saved successfully!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to save changes.';
                    if (errorMessage === "No changes made.") {
                      editingRowIndex = -1;
                    } else {
                      toast.error(errorMessage);
                    }
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
            {headerNames[head] || head}
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

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <Input type="text" bind:value={editEquipment.name} />  
            {:else}
              {equipment.name}
            {/if}
          </TableBodyCell>

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <Select
                items={equipmentTypes}
                bind:value={editEquipment.type}
                disabled={loading}
              />
            {:else}
              {equipment.type}
            {/if}
          </TableBodyCell>

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <Input type="text" bind:value={editEquipment.location} />  
            {:else}
              {equipment.location}
            {/if}
          </TableBodyCell>

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <Select
                items={status}
                bind:value={editEquipment.status}
                disabled={loading}
              />
            {:else}
              {equipment.status}
            {/if}
          </TableBodyCell>

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <Input type="text" bind:value={editEquipment.notes} />  
            {:else}
              {equipment.notes}
            {/if}
          </TableBodyCell>

          <TableBodyCell>{formatDate(equipment.date_registered).toString()}</TableBodyCell>

          <TableBodyCell>
            {#if editingRowIndex === equipment.id}
              <form method="POST" action="?/editEquipment" use:enhance={saveChanges}>
                <input type="hidden" name="id" value={editEquipment.id}/>
                <input type="hidden" name="name" value={editEquipment.name}/> <input type="hidden" name="old_name" value={equipment.name}/>
                <input type="hidden" name="type" value={editEquipment.type}/> <input type="hidden" name="old_type" value={equipment.type}/>
                <input type="hidden" name="location" value={editEquipment.location}/> <input type="hidden" name="old_location" value={equipment.location}/>
                <input type="hidden" name="status" value={editEquipment.status}/> <input type="hidden" name="old_status" value={equipment.status}/>
                <input type="hidden" name="notes" value={editEquipment.notes}/> <input type="hidden" name="old_notes" value={equipment.notes}/>
                <button type="submit" disabled={loading} class="mr-2"><CheckOutline class="text-green-600 mr-2"/></button>
                <button on:click={() => {editingRowIndex = -1}} disabled={loading}><CloseOutline class="text-red-600"/></button>
              </form>
            {:else}
              <button on:click={() => editRow(equipment)}><EditOutline class="text-green-700 mr-2"/></button>
              <button on:click={() => {DeleteModal = true; eq = equipment}}><TrashBinOutline class="text-red-700"/></button>
            {/if}
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

<Modal size="xs" bind:open={DeleteModal} outsideclose>
  <div class="text-center">
    <h3 class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-400">Delete equipment from database?</h3>
    <p class="mb-6 text-sm">You are about to delete this entry. This cannot be undone.</p>
    <p class="text-gray-800">Name: <span style="font-weight: 600;">{eq.name}</span></p>
    <p class="text-gray-800">Type: <span style="font-weight: 600;">{eq.type}</span></p>
    <p class="text-gray-800">Location: <span style="font-weight: 600;">{eq.location}</span></p>
    <p class="mb-6 text-gray-800">Notes: <span style="font-weight: 600;">{eq.notes}</span></p>
    <form method="POST" action="?/deleteEquipment" use:enhance={deleteEquipment}>
      <input type="hidden" name="id" value={eq.id}/>
      <div class="flex mb-1 gap-1 justify-center">
        <Button type="submit" disabled={loading} color="red" class="me-2"><TrashBinOutline class="text-white mr-1"/>Delete</Button>
        <Button color="alternative" disabled={loading} on:click={() => DeleteModal = false}>Cancel</Button>
      </div>
    </form>
  </div>
</Modal>

<Modal title="Add Equipment" bind:open={AddModal} outsideclose>
  <form class="space-y-5 mb-2" method="POST" action="?/addEquipment" use:enhance={submitEquipment}>
    <div class="mb-3">
      <Label class="block mb-1">Name</Label>
      <Input 
        name="name" 
        type="text" 
        id="name"
        placeholder="Enter the model/brand or any descriptive name for the equipment." 
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
                    placeholder="Enter new equipment type."
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
    <hr>
    <div class="flex gap-5 justify-center">
      <Button type="submit" class="w-full" disabled={loading}>Confirm</Button>
      <Button 
        type="button" 
        color="alternative"
        disabled={loading} 
        on:click={() => AddModal = false}
      >
        Cancel
      </Button>
    </div>
  </form>
</Modal>