<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton, MultiSelect } from 'flowbite-svelte';
  import { EditOutline, TrashBinOutline, FilterSolid, ChevronSortOutline } from 'flowbite-svelte-icons';

  let users = data.user;

  let tableHead = []
  if (users != null){
    tableHead = Object.keys(users[0]);
  }

  let userName;

  let DeleteModal=false;

  

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

  users.forEach(item => {
    item.dateString = formatDate(item.created) // or use another format if preferred
  });

  let searchQuery='';
  let selectedType = [];
  let type = data.userTypes.map(item => ({
    value: item.description,
    name: item.description
  }));
  // console.log(data)

  $: users = data.user
    .filter(item => 
      selectedType.length === 0 || selectedType.includes(item.description)
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
        users = users.sort((a, b) => {
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
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select admin type" items={type} bind:value={selectedType} />
    </div>
    <hr>
  </div>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Users Database</p>
  </div>
  <div class="pb-5">
  {#if users != null }
  <Table shadow>
    <TableHead>
      <TableHeadCell></TableHeadCell>
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
        <TableBodyCell><Input type="number" min=1 max=5 value={user?.access_level}></Input></TableBodyCell>
        <TableBodyCell>{user.description}</TableBodyCell>
        <TableBodyCell>{formatDate(user.created)}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  {:else}
  <p  class="content-center text-gray-500">No blocked slots yet</p>
  {/if}
  </div>
  
</div>

<Modal title="Delete {userName} from database?" bind:open={DeleteModal} autoclose>
  <div class="flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

