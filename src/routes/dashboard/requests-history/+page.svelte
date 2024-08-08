<script>
    import { Search, Button, Dropdown, DropdownItem, Checkbox, Radio, GradientButton} from 'flowbite-svelte';
    import { SearchOutline, ArrowLeftOutline, FilterSolid } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    import RequestsCard from './requests-card.svelte';
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
            <p>Status</p>
            <li>
                <Checkbox>Approved</Checkbox>
            </li>
            <li>
                <Checkbox>Declined</Checkbox>
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
        <GradientButton color="green">
          <SearchOutline class="w-6 h-6" />
        </GradientButton>
      </form>

    <div class="pb-3">
      <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
      <h1 class="pt-3 font-semibold text-xl text-gray-700">Requests History</h1>
    </div>
  
    <div class="space-y-3">
      {#each requestInfo as info}
      <RequestsCard {info}></RequestsCard>
      {/each}
    </div>

    
  </div>
