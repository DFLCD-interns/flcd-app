<script>
    export let batches;
  
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
    import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';

    let tableHead = [];
    if (batches[0] != null){
      tableHead = Object.keys(batches[0]);
    }
  
    let EditModal = false;
    let DeleteModal = false;
  
    let currBatch = batches[0];

  </script>

<div class="pb-5">
    
{#if batches != null }
<Table shadow>
    <TableHead>
    <TableHeadCell></TableHeadCell>
    <TableHeadCell></TableHeadCell>
    {#each tableHead as head}
    <TableHeadCell>{head}</TableHeadCell>
    {/each}
    </TableHead>
    <TableBody tableBodyClass="divide-y">
    {#each batches as batch}
    <TableBodyRow>
        <TableBodyCell>
            <button on:click={() => {EditModal = true; currBatch = batch}}><EditOutline  class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>
        <button on:click={() => {DeleteModal = true; currBatch = batch}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>{batch.id}</TableBodyCell>
        <TableBodyCell>{batch.name}</TableBodyCell>
        <TableBodyCell>{batch.description}</TableBodyCell>
        <TableBodyCell>{batch.created}</TableBodyCell>
    </TableBodyRow>
    {/each}
    </TableBody>
</Table>
{:else}
<p  class="content-center text-gray-500">No batches in database</p>
{/if}
</div>
  
<Modal title="Edit Batch" bind:open={EditModal} autoclose>
    <form>
    <div class="mb-6">
        <Label class="block mb-2">Batch Name</Label>
        <Input name="name" type="text" value={currBatch.name} required />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Description</Label>
        <Input name="description" type="text" value={currBatch.description} />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Date Created</Label>
        <Input name="description" type="text" value={currBatch.created} onfocus="(this.type='date')" onblur="(this.type='text')"/>
    </div>
    <div class="mb-6 flex gap-2 justify-center">
        <GradientButton color="green">Confirm</GradientButton>
        <GradientButton on:click={() => {EditModal = false}} color="green">Cancel</GradientButton>
    </div>
</form>
</Modal>

<Modal title="Delete batch {currBatch.name} from database?" bind:open={DeleteModal} autoclose>
<div class="flex gap-5 justify-center">
    <GradientButton color="green">Confirm</GradientButton>
    <GradientButton color="green">Cancel</GradientButton>
</div>
</Modal>
