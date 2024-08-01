<script>
	export let data;
  import { Search, Button, Dropdown, DropdownItem, Checkbox, Radio, GradientButton} from 'flowbite-svelte';
  import { SearchOutline, FilterSolid} from 'flowbite-svelte-icons';
  import RequestsCard from './requests-card.svelte';
  import { sineIn } from 'svelte/easing';

  console.log(data)

  let requestInfo = [
      {
        reqid: "0",
        material:"Speaker",
        date:"August 24, 2024",
        status: "1"
      },
      {
        reqid:"1",
        material:"Microphone",
        date:"August 28, 2024",
        status: "2"
      },
    ]
    let userData = {
          firstName: "Cynthia",
          lastName: "Watts",
          userType: "Student"
      }
    let hidden1 = true;
    let transitionParams = {
      x: -320,
      duration: 200,
      easing: sineIn
    };
      function handleClick() {
          window.location.href = "/";
      }
</script>
  
<div class="px-10 py-10 w-full min-h-screen">
  <form class="flex gap-2 pb-10">
      <GradientButton color="green">
          <span class="pr-1">Filter </span>
          <FilterSolid></FilterSolid>
      </GradientButton>
      <Dropdown class="w-44 p-3 space-y-3 text-sm">
          <p>Type</p>
          <li>
              <Checkbox>Equipment Requests</Checkbox>
          </li>
          <li>
              <Checkbox>Venue Requests</Checkbox>
          </li>
          <li>
              <Checkbox>Observation Requests</Checkbox>
          </li>
          <p>Sort by</p>
          <li>
              <Radio name="group1" value={1}>Oldest to Newest</Radio>
          </li>
          <li>
              <Radio name="group1" value={1}>Newest to Oldest</Radio>
          </li>
          <DropdownItem>Confirm</DropdownItem>
      </Dropdown>
      
      <Search size="md" />
      <GradientButton color="green" class="!p-2.5">
        <SearchOutline class="w-6 h-6" />
      </GradientButton>
    </form>

  <div class="flex items-center justify-between pb-3">
    <h1 class="font-semibold text-xl text-gray-700">Pending Requests</h1>
    <a href="/dashboard/requests-history" class="flex text-gray-500">
      <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="2 -2 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
      View Requests History
    </a>
  </div>

  <div class="space-y-3">
    <!-- {#each requestInfo as info}
    <RequestsCard {info}></RequestsCard>
    {/each} -->
  </div>
</div>