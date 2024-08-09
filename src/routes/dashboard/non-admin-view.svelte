<script>
  export let data;
  import { Card, Button, Drawer, CloseButton, Badge, GradientButton } from 'flowbite-svelte';
  import { ArrowRightOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
  import { sineIn } from 'svelte/easing';
  import RequestsCard from './requests-card.svelte';
  //placeholder for now
  // let requestInfo = data.
  // let reduced = requestInfo.reduce((x, y) => {
  //   (x[y.id] = x[y.id] || []).push(y);
  //   return x;
  // }, {});
  // let grouped_requests = Object.keys(reduced).map((key) => reduced[key]);
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
    function handleClick() {
        window.location.href = "/";
    }
</script>

<div class="px-10 py-10">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome, {data.current_user.first_name}!</h5>
    <div class="flex flex-wrap w-full mb-6  align-center justify-center">
      <div class="sm:w-1/2 sm:mb-0 mb-2 w-full">
        <Card class="w-full max-w-full sm:mr-1.5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Borrow requests</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">Borrow equipment or venues for your own use.</p>
            <div class="flex sm:justify-normal justify-end">
              <GradientButton color="green" shadow href="/dashboard/requestsform" class="w-fit align-self-end">
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
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My requests</h5>
      <a href="#" class="text-gray-500"> View Requests History</a>
    </div>
  
    {#if data.requestsInfo?.length != 0 && data.requestsInfo != undefined}
      <div class="space-y-3">
        {#each data.requestsInfo as info}
          <RequestsCard info={info} data={data}></RequestsCard>
        {/each}
      </div>
    {:else}
      <p class="text-gray-500">No Pending Requests</p>
    {/if}
</div>

  