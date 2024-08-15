<script>
    export let classes;
  
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
    import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';

    let tableHead = [];
    if (classes[0] != null){
      tableHead = Object.keys(classes[0]);
    }
  
    let EditModal = false;
    let DeleteModal = false;
  
    let currClass = classes[0];

    console.log(classes)
  </script>

<div class="pb-5">
    
{#if classes != null }
<Table shadow>
    <TableHead>
    <TableHeadCell></TableHeadCell>
    <TableHeadCell></TableHeadCell>
    {#each tableHead as head}
    <TableHeadCell>{head}</TableHeadCell>
    {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
    {#each classes as Class}
    <TableBodyRow>
        <TableBodyCell>
            <button on:click={() => {EditModal = true; currClass = Class}}><EditOutline  class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>
        <button on:click={() => {DeleteModal = true; currClass = Class}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>{Class.class_id}</TableBodyCell>
        <TableBodyCell>{Class.class_name}</TableBodyCell>
        <TableBodyCell>{Class.batch_id}</TableBodyCell>
        <TableBodyCell>{Class.batch}</TableBodyCell>
        <TableBodyCell>{Class.handler_id}</TableBodyCell>
        <TableBodyCell>{Class.handler_firstname}</TableBodyCell>
        <TableBodyCell>{Class.handler_lastname}</TableBodyCell>
        <TableBodyCell>{Class.description}</TableBodyCell>
        <TableBodyCell>{Class.schedule}</TableBodyCell>
        <TableBodyCell>{Class.created}</TableBodyCell>
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
