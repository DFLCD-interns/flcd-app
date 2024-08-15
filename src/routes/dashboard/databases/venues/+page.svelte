<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
  import { DownloadSolid, EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid, ChevronSortOutline } from 'flowbite-svelte-icons';
  import { downloadCSV } from '../downloadcsv';

  // console.log('d:', data)
  // console.log('v:', data.venues)

  let venues = data.venues;
  let tableHead = []
  if (venues.length != null){
    tableHead = Object.keys(venues[0]);
  }
  
  let venueName="venue"

  let EditModal = false;
  let DeleteModal=false;
  let AddModal = false;

  let editVenue;

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

    return `${formattedDate} at ${formattedTime}`;}

  venues.forEach(item => {
    item.dateString = formatDate(item.date_registered) // or use another format if preferred
  });

  let searchQuery='';

  $: venues = data.venue
    .filter(item =>
      searchQuery === '' || Object.values(item).some(value =>
        // Search all string fields
        typeof value === 'string' && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

      let sortDirection = 'asc'; // Default sort direction
      let column='id';
      function handleSort(column) {
        venues = venues.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Sort strings alphabetically
          if (sortDirection === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
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
  <form class="flex gap-2 pb-5">
    <Search size="md" bind:value={searchQuery}/>
  </form>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Venues Database</p>
    <div class = "flex gap-2">
    <GradientButton on:click={downloadCSV(venues, 'venue')} color="green" class="inline-flex text-center gap-2"><DownloadSolid/>Download Table</GradientButton>
    <GradientButton on:click={() => {AddModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Venue</GradientButton>
    </div>
  </div>
  <div class="pb-5">
  {#if venues != null }
  <Table shadow>
    <TableHead>
      <TableHeadCell></TableHeadCell>
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
        <TableBodyCell>{formatDate(venue.date_registered)}</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  {:else}
  <p  class="content-center text-gray-700">No venues in database</p>
  {/if}
  </div>
  
</div>

<Modal title="Edit Venue Details" bind:open={EditModal} autoclose>
  <div class="mb-6">
      <Label class="block mb-2">Name</Label>
      <Input value={editVenue.name} />
  </div>
  <div class="mb-6">
      <Label class="block mb-2">Description</Label>
      <Input value={editVenue.description} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Date Created</Label>
    <Input value={editVenue.created} onfocus="(this.type='date')" />
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
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Date Created</Label>
    <Input type="datetime-local"/>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>