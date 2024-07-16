<script>
    import { Search, Button, Dropdown, DropdownItem, Checkbox, Radio} from 'flowbite-svelte';
    import { SearchOutline, ChevronDownOutline, FilterSolid } from 'flowbite-svelte-icons';

    function handleClick() {
        window.location.href = "/";
    }

    let group1 = 2;
</script>


  <div class="px-10 py-10 w-full min-h-screen">
    <form class="flex gap-2 pb-10">
        <Button>
            <span class="pr-1">Filter </span>
            <FilterSolid></FilterSolid>
        </Button>
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
        <Button class="!p-2.5">
          <SearchOutline class="w-6 h-6" />
        </Button>
      </form>

    <div class="flex items-center justify-between pb-3">
      <h1 class="font-semibold text-gray-700">Requests History</h1>
      <a href="/dashboard" class="text-gray-500">View Pending Requests</a>
    </div>
  
    <div class="rounded-lg shadow-lg p-6">
      <div class="flex justify-between items-center">
        <div class="mb-2">
          <h5 class="text-xl font-semibold text-gray-600">Equipment Request</h5>
          <p class="mt-2 text-gray-400">for August 24, 2024</p>
          <p class="mt-2 text-green-600">Approved</p>
        </div>
        <a href="/request" class="flex items-center overflow-hidden relative w-50 h-10 text-white p-4 rounded-md bg-gradient-to-r from-green-600 to-lime-300 hover:from-lime-300 hover:to-green-600">
          View
        </a>
        </div>
    </div>

    
  </div>
