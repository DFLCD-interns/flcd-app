<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid } from 'flowbite-svelte-icons';

  let users = data.user;

  let userName;

  let DeleteModal=false;

</script>
  
<div class="p-10">
  <form class="flex gap-2 pb-5">
    <Search size="md" />
    <GradientButton color="green" class="!p-2.5">
      <SearchOutline class="w-6 h-6" />
    </GradientButton>
  </form>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Users Database</p>
  </div>
  <div class="pb-5">
  {#if users.length != 0 }
  <Table shadow>
    <TableHead>
      <TableHeadCell></TableHeadCell>
      <TableHeadCell>id</TableHeadCell>
      <TableHeadCell>first_name</TableHeadCell>
      <TableHeadCell>last_name</TableHeadCell>
      <TableHeadCell>email</TableHeadCell>
      <TableHeadCell>phone</TableHeadCell>
      <TableHeadCell>student_number</TableHeadCell>
      <TableHeadCell>course</TableHeadCell>
      <TableHeadCell>department</TableHeadCell>
      <TableHeadCell>min_approval_layer</TableHeadCell>
      <TableHeadCell>access_level</TableHeadCell>
      <TableHeadCell>created</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each users as user}
      <TableBodyRow>
        <TableBodyCell>
          <button on:click={() => {DeleteModal = true; userName = user.first_name+" "+user.last_name}}><TrashBinOutline class="text-green-600"/></button>
        </TableBodyCell>
        <TableBodyCell>{user.id}</TableBodyCell>
        <TableBodyCell>{user.first_name}</TableBodyCell>
        <TableBodyCell>{user.last_name}</TableBodyCell>
        <TableBodyCell>{user.email}</TableBodyCell>
        <TableBodyCell>{user.phone}</TableBodyCell>
        <TableBodyCell>{user.student_number}</TableBodyCell>
        <TableBodyCell>{user.course}</TableBodyCell>
        <TableBodyCell>{user.department}</TableBodyCell>
        <TableBodyCell>{user.min_approval_layer}</TableBodyCell>
        <TableBodyCell><Input type="number" min=1 max=5 value={user.access_level}></Input></TableBodyCell>
        <TableBodyCell>{user.created}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  {:else}
  <p  class="content-center text-gray-500">No users in database</p>
  {/if}
  </div>
  
</div>

<Modal title="Delete {userName} from database?" bind:open={DeleteModal} autoclose>
  <div class="flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

