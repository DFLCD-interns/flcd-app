<script>
    export let access_level;
    export let classes;
  
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
    import { EditOutline, TrashBinOutline, ChevronSortOutline } from 'flowbite-svelte-icons';

    let tableHead = [];
    if (classes[0] != null){
      tableHead = Object.keys(classes[0]);
    }
  
    let EditModal = false;
    let DeleteModal = false;
  
    let currClass = classes[0];

    console.log(classes)

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
        return `${month}/${day}/${year}  ${hours}:${minutes}`;}

        let sortDirection = 'asc'; // Default sort direction
        let column='id';
        function handleSort(column) {
            classes = classes.sort((a, b) => {
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

<div class="pb-5">
    
{#if classes != null }
<Table shadow>
    <TableHead>
    {#each tableHead as head}
    {#if head != 'batch_id' && head != 'handler_id'}
    <TableHeadCell>
        <button type='button' class="flex cursor-pointer" on:click={() => handleSort(head)}>
          {head}
          <ChevronSortOutline size='sm'/>
        </button>
    </TableHeadCell>
    {/if}
    {/each}
    {#if access_level != 4}
    <TableHeadCell></TableHeadCell>
    {/if}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
    {#each classes as Class}
    <TableBodyRow>
        <TableBodyCell>{Class.class_id}</TableBodyCell>
        <TableBodyCell>{Class.class_name}</TableBodyCell>
        <TableBodyCell>{Class.batch}</TableBodyCell>
        <TableBodyCell>{Class.handler_firstname}</TableBodyCell>
        <TableBodyCell>{Class.handler_lastname}</TableBodyCell>
        <TableBodyCell>{Class.description}</TableBodyCell>
        <TableBodyCell>{Class.schedule}</TableBodyCell>
        <TableBodyCell>{formatDate(Class.created)}</TableBodyCell>
        {#if access_level != 4}
          <TableBodyCell>
            <button on:click={() => {EditModal = true; currClass = Class}}><EditOutline class="text-green-700 mr-2"/></button>
            <button on:click={() => {DeleteModal = true; currClass = Class}}><TrashBinOutline class="text-red-700"/></button>
          </TableBodyCell>
        {/if}
    </TableBodyRow>
    {/each}
    </TableBody>
</Table>
{:else}
<p  class="content-center text-gray-500">No batches in database</p>
{/if}
</div>
  
<Modal title="Edit Class" bind:open={EditModal} autoclose>
    <form>
    <div class="mb-6">
        <Label class="block mb-2">Class Name</Label>
        <Input name="name" type="text" value={currClass.class_name} required />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Batch ID</Label>
        <Input name="description" type="number" value={currClass.batch_id} />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Handler ID</Label>
        <Input name="description" type="number" value={currClass.handler_id} />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Description</Label>
        <Input name="description" type="text" value={currClass.description} />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Schedule</Label>
        <Input name="description" type="text" value={currClass.schedule} />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Date Created</Label>
        <Input name="description" type="text" value={currClass.created} onfocus="(this.type='date')" onblur="(this.type='text')"/>
    </div>
    <div class="mb-6 flex gap-2 justify-center">
        <GradientButton color="green">Confirm</GradientButton>
        <GradientButton on:click={() => {EditModal = false}} color="green">Cancel</GradientButton>
    </div>
</form>
</Modal>

<Modal title="Delete batch {currClass.name} from database?" bind:open={DeleteModal} autoclose>
<div class="flex gap-5 justify-center">
    <GradientButton color="green">Confirm</GradientButton>
    <GradientButton color="green">Cancel</GradientButton>
</div>
</Modal>
