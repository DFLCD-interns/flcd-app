<script>
  export let data;
  export let form;
  import { Card, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, UndoOutline } from 'flowbite-svelte-icons';
  import RequestsCard from './requests-card.svelte';

  let viewingPendingReqs = true;
  const pendingRequests = [], finishedRequests = [];
  data.requestsInfo?.forEach(req => {
    // console.log(req)
    if (req.status.includes('pending') && ((req.table.includes('equipment') && !req.actual_date_end) || req.actual_date_end > new Date())) 
      pendingRequests.push(req) 
    else finishedRequests.push(req)
  });

  // console.log(data.current_user.access_level)

</script>

<div class="px-10 py-10">
  <h5 class="mb-7 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Request Forms</h5>
  <div class="flex flex-wrap w-full mb-12 align-center justify-center">

    <!-- First Card -->
    <div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> <!-- Add flex here -->
      <Card class="relative w-full max-w-full h-full"> <!-- Add h-full here -->
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Equipment</h5>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight">Borrow the department's equipment. Printing available for FLCD students.</p>
        <div class="flex sm:flex-row flex-col sm:justify-end relative">
          <div class="sm:absolute sm:left-[-10px] sm:bottom-[-25px] mb-[-3px] sm:mb-0">
            <img src="/1.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;" />
          </div>
          <GradientButton color="green" shadow href="/dashboard/requests-form" class="sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end">
            Borrow <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
          </GradientButton>
        </div>
      </Card>
    </div>
  
    <!-- Second Card -->
    <div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> <!-- Add flex here -->
      <Card class="relative w-full max-w-full h-full"> <!-- Add h-full here -->
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Venues</h5>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight">Reserve rooms in the UPCDC Building for your activities & events.</p>
        <div class="flex sm:flex-row flex-col sm:justify-end relative">
          <div class="sm:absolute sm:left-[-10px] sm:bottom-[-25px] mb-[-1px] sm:mb-0">
            <img src="/2.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;" />
          </div>
          <GradientButton color="green" shadow href="/dashboard/requests-form" class="sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end">
            Reserve <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
          </GradientButton>
        </div>
      </Card>
    </div>
  
    <!-- Third Card -->
    {#if data.current_user.access_level != 7}
    <div class="sm:w-1/3 w-full mb-2 sm:mb-0 px-3 flex"> <!-- Add flex here -->
      <Card class="relative w-full max-w-full h-full"> <!-- Add h-full here -->
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Observations</h5>
        <p class="mb-3 text-sm text-gray-700 dark:text-gray-400 leading-tight">Book an available class observation schedule for your research.</p>
        <div class="flex sm:flex-row flex-col sm:justify-end relative">
          <div class="sm:absolute sm:left-0 sm:bottom-[-25px] mb-[-13px] ml-2 sm:mb-0">
            <img src="/3.png" alt="Description" class="object-cover" style="width: 9.5rem; height: 9.5rem;" />
          </div>
          <GradientButton color="green" shadow href="/dashboard/observation-form" class="sm:mt-16 mt-0 sm:mb-4 ml-auto w-fit align-self-end">
            Book <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
          </GradientButton>
        </div>
      </Card>
    </div>
    {/if}
  
  </div>  

  {#if data.current_user.access_level != 7}
    <div class="flex items-center justify-between pb-3">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{viewingPendingReqs ? 'Your Pending Requests' : 'History'}</h5>
      <button class="text-gray-500 flex" on:click={() => viewingPendingReqs = !viewingPendingReqs}> 
        {#if viewingPendingReqs}
          <svg class="h-5 w-5 text-gray-500" width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
          View Requests History
        {:else}
          <UndoOutline class="h-5 w-5 text-gray-500 mr-1"/>
          View Pending Requests
      {/if}
      </button>
    </div>
  
    {#if (viewingPendingReqs ? pendingRequests : finishedRequests).length > 0 && data.requestsInfo != undefined}
      <div class="space-y-3">
        {#if viewingPendingReqs} {#each pendingRequests as info}
            <RequestsCard info={info} data={data} form={form}></RequestsCard>
        {/each} {:else} {#each finishedRequests as info}
            <RequestsCard info={info} data={data} form={form}></RequestsCard>
        {/each} {/if}
      </div>
    {:else}
      <p class="text-gray-500 text-center mt-5">
        { viewingPendingReqs ? 'No Pending Requests' : 'No Finished Requests'}
      </p>
    {/if}
    {/if}
</div>

  