<script>
  /** @type {import('./$types').PageData} */
	export let data;
  import { Search, Card, GradientButton, MultiSelect, Select} from 'flowbite-svelte';
  import { SearchOutline, FilterSolid} from 'flowbite-svelte-icons';
  import RequestsCard from './requests-card.svelte';
  import { sineIn } from 'svelte/easing';
  import { page } from '$app/stores';
  import { parse, format } from 'date-fns';
  // import { isTemplateSpan } from 'typescript';
  let selectedType = ['Equipment Request', 'Venue Request'];
  let type = [
  { value: 'Equipment Request', name: 'equipment' },
  { value: 'Venue Request', name: 'venue' },
  { value: 'observation', name: 'observation' }]
  let selectedSort = '';
  let sort=[
  { value: 'newest to oldest', name: 'created: newest to oldest' },
  { value: 'oldest to newest', name: 'created: oldest to newest' },
  { value: 'most urgent to least urgent', name: 'needed: most urgent to least urgent' },
  { value: 'least urgent to most urgent', name: 'needed: least urgent to most urgent' }
  ]

  console.log(data)
  let allRequests=[]; 

  function parseDateTime(dateTimeStr) {
    // Remove 'at' and extra spaces from the string
    const cleanedStr = dateTimeStr.replace(/\sat\s/, ' ').replace(/\s+/g, ' ').trim();
    // Parse date-time string
    const parsedDate = parse(cleanedStr, 'MMMM d, yyyy hh:mm a', new Date());
    return parsedDate
  }


  $: {
    // Filter requests based on selected types
    let filteredRequests = data.requestsInfo.filter(item => selectedType.includes(item.type));
    
    // Parse date-time strings and sort
    allRequests = filteredRequests
      .map(request => ({
        ...request,
        parsedDate: parseDateTime(request.date), // Assuming date is the field
        createdDate: new Date(request.created) // Convert ISO 8601 string to Date object
      }))
      .sort((a, b) => {
        if (selectedSort === 'newest to oldest') {
          return b.createdDate - a.createdDate; // Descending order by created
        } else if (selectedSort === 'oldest to newest') {
          return a.createdDate - b.createdDate; // Ascending order by created
        } else if (selectedSort === 'least urgent to most urgent') {
          return b.parsedDate - a.parsedDate; // Descending order by date_needed
        } else if (selectedSort === 'most urgent to least urgent') {
          return a.parsedDate - b.parsedDate; // Ascending order by date_needed
        } else {
          return 0; // Default case
        }
      });

    console.log(allRequests)
  }

  // data.requestsInfo.forEach(function (item) {
  //   if(selectedType.includes(item.type)){
  //     allRequests.push(item)
  //   }
  // })

  console.log(data)
  console.log(selectedType)
</script>
  
<div class="space-y-3 px-10 py-10 w-full min-h-screen">

  <form class="gap-2 w-full pb-5">
    <!-- <GradientButton color="green">
        <span class="pr-1">Filter </span>
        <FilterSolid></FilterSolid>
    </GradientButton> -->
    <div class="flex gap-2 w-full items-start pb-2">
      <Search size="md"/>
      <GradientButton size="sm" color="green" class="h-10">
        search
      </GradientButton>
    </div>

    <div class="flex gap-2 pb-2  w-full">
      <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select type" items={type} bind:value={selectedType} />
      <Select class="w-full bg-white text-gray-400 text-sm" placeholder="sort by" items={sort} bind:value={selectedSort} />
    </div>
    <hr>
  </form>


  <div class="flex items-center justify-between pb-0">
    <h1 class="font-semibold text-xl text-gray-700">Pending Requests</h1>
    <a href="/dashboard/requests-history" class="flex text-gray-500">
      <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
      View Requests History
    </a>
  </div>

  {#if data.requestsInfo.length != 0 && data.requestsInfo != undefined}
    <div class="space-y-3">
      {#each allRequests as info}
        <RequestsCard info={info}></RequestsCard>
      {/each}
    </div>
  {:else}
    <p class="text-gray-500">No Pending Requests</p>
  {/if}
</div>