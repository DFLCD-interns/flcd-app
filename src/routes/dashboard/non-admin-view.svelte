<script>
  export let data;
  import { Card, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, UndoOutline } from 'flowbite-svelte-icons';
  import RequestsCard from './requests-card.svelte';

  let viewingPendingReqs = true;
  const pendingRequests = [], finishedRequests = [];
  data.requestsInfo.forEach(req => {
    if (req.actual_date_end > new Date()) 
      pendingRequests.push(req) 
    else finishedRequests.push(req)
  });

</script>

<div class="px-10 py-10">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome, {data?.current_user?.first_name}!</h5>
    <div class="flex flex-wrap w-full mb-6  align-center justify-center">
      <div class="sm:w-1/2 sm:mb-0 mb-2 w-full">
        <Card class="w-full max-w-full sm:mr-1.5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Borrow requests</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Borrow equipment or venues for your own use.</p>
            <div class="flex sm:justify-normal justify-end">
              <GradientButton color="green" shadow href="/dashboard/requests-form" class="w-fit align-self-end">
                Request <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
              </GradientButton>
            </div>      
          </Card>
      </div>
      <div class="sm:w-1/2 w-full">
        <Card class="w-full max-w-full h-full sm:ml-1.5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Book an observation</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Book an available observation schedule.</p>
          <div class="flex sm:justify-normal justify-end">
            <GradientButton color="purple" shadow href="/dashboard/observationform" class="w-fit align-self-end">
              Book <ArrowRightOutline class="w-6 h-6 ms-2 text-white" />
            </GradientButton>
          </div>
        </Card>
      </div>
      </div>

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
            <RequestsCard info={info} data={data}></RequestsCard>
        {/each} {:else} {#each finishedRequests as info}
            <RequestsCard info={info} data={data}></RequestsCard>
        {/each} {/if}
      </div>
    {:else}
      <p class="text-gray-500">
        { viewingPendingReqs ? 'No pending requests' : 'No finished requests'}
      </p>
    {/if}
</div>

  