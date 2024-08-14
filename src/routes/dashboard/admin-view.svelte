<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Search, MultiSelect, Select} from 'flowbite-svelte';
  import { FilterSolid, UndoOutline } from 'flowbite-svelte-icons';
  import RequestsCard from './requests-card.svelte';
  import { parse } from 'date-fns';
  // import { isTemplateSpan } from 'typescript';

  let selectedType = ['Equipment Request', 'Venue Request', 'Class Observation Request'];
  let type = [
  { value: 'Equipment Request', name: 'equipment' },
  { value: 'Venue Request', name: 'venue' },
  { value: 'Class Observation Request', name: 'observation' }]

  let selectedSort = '';
  let sort=[
    { value: 'newest to oldest', name: 'created: newest to oldest' },
    { value: 'oldest to newest', name: 'created: oldest to newest' },
    { value: 'most urgent to least urgent', name: 'needed: most urgent to least urgent' },
    { value: 'least urgent to most urgent', name: 'needed: least urgent to most urgent' }]

  // Filter out all requests that are not for this user to see (invisible)
  let allRequests = data.requestsInfo.filter(req => {
    console.log(req)
    const idIdx = req.approvalsInfo.userIDs.findIndex(id => data.current_user.access_level === 3 ? id == null : id === data.current_user.user_id );
    const approvedIdx = req.approvalsInfo.statuses.findIndex(status => status === 'approved');
    console.log(idIdx, approvedIdx)
    console.log(idIdx <= (approvedIdx+1))
    return idIdx <= (approvedIdx+1); // the only ones who can see are the pendng-approver and past-approver
  });
  // console.log(data.requestsInfo)
  // console.log(allRequests)

  let searchQuery = '';

  function parseDateTime(dateTimeStr, type) {
    // Remove 'at' and extra spaces from the string
    // Parse date-time string
    console.log(dateTimeStr)
    let parsedDate = ""
    if (type == 'Class Observation Request'){return dateTimeStr}
    else { parsedDate = parse(dateTimeStr.toString().replace(/\sat\s/, ' ').replace(/\s+/g, ' ').trim(), 'MMMM d, yyyy hh:mm a', new Date()); }
    return parsedDate
  }

  let viewingPendingReqs = true;
  let pendingRequests, otherRequests;
  $: {
    // Filter and sort based on selected type and search query
    let filteredRequests = allRequests
      .filter(item => selectedType.includes(item.type)) // Filter by type
      .map(request => ({
        ...request,
        parsedDate: parseDateTime(request.date, request.type), // Parse date_needed
        createdDate: new Date(request.created) // Parse created date
      }))
      .filter(item =>
        searchQuery === '' || // If searchQuery is empty, include all
        Object.values(item).some(value =>
          typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

    // Sort based on selected sort option
    allRequests = filteredRequests.sort((a, b) => {
      if (selectedSort === 'newest to oldest') {
        return b.createdDate - a.createdDate;
      } else if (selectedSort === 'oldest to newest') {
        return a.createdDate - b.createdDate;
      } else if (selectedSort === 'least urgent to most urgent') {
        return b.parsedDate - a.parsedDate;
      } else if (selectedSort === 'most urgent to least urgent') {
        return a.parsedDate - b.parsedDate;
      } else {
        return 0; // Default case
      }
    });
    
    pendingRequests = [];
    otherRequests = [];
    allRequests.forEach(req => {
    if (req.status.includes(data.user_access_level_label)) 
      pendingRequests.push(req)
    else otherRequests.push(req);
  });
  }

</script>
  
<div class="space-y-3 px-10 py-10 w-full min-h-screen">

  <form class="gap-2 w-full pb-5">
    <div class="flex gap-2 w-full items-start pb-2">
      <Search size="md" bind:value={searchQuery}/>
    </div>

    <div class="flex gap-2 pb-2  w-full">
      <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select type" items={type} bind:value={selectedType} />
      <Select class="w-full bg-white text-gray-400 text-sm" placeholder="sort by" items={sort} bind:value={selectedSort} />
    </div>
    <hr>
  </form>

  <div class="flex items-center justify-between pb-0">
    <h1 class="font-semibold text-xl text-gray-700">{viewingPendingReqs ? 'Pending Requests' : 'History'}</h1>
    <button class="flex text-gray-500" on:click={()=> viewingPendingReqs = !viewingPendingReqs}>
      {#if viewingPendingReqs}
        <svg class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
        View Requests History
      {:else}
        <UndoOutline class="h-5 w-5 text-gray-500 mr-1"/>
        View Pending Requests
      {/if}
    </button>
  </div>

  {#if (viewingPendingReqs ? pendingRequests : otherRequests).length != 0 && data.requestsInfo != undefined}
    <div class="space-y-3">
      {#if viewingPendingReqs} {#each pendingRequests as info}
          <RequestsCard info={info} data={data}></RequestsCard>
      {/each} {:else} {#each otherRequests as info}
          <RequestsCard info={info} data={data}></RequestsCard>
      {/each} {/if}
    </div>
  {:else}
    <p class="text-gray-500">No Pending Requests</p>
  {/if}
</div>