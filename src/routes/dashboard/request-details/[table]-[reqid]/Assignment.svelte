<script>
    import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
    import { postgresTimeToTimeslot } from '$lib';

    export let data;
    export let form;
    
    let hoveredItem, dropDownsStates, dropDownDataStates;
    let getRequestRows, getDisplayName, dropdownItems, getAssignedItemID, mustDisplayDropdown, getAssignedItemIdx;
    if (data.requestType === 'equipment') {
        getDisplayName = (item) => item[0];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.equipment_type == getDisplayName(item)) || [];
        dropdownItems = data.equipments;
        getAssignedItemID = (requestRow) => requestRow.equipment_id;
        mustDisplayDropdown = (dropDownItem, item) => dropDownItem.type === getDisplayName(item);
        dropDownsStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        dropDownDataStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
    }
    else if (data.requestType === 'venue') {
        getDisplayName = (item) => item[1];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.name == getDisplayName(item)) || [];
        dropdownItems = data.venues;
        getAssignedItemID = (requestRow) => requestRow?.venue_id;
        mustDisplayDropdown = (dropDownItem, item) => true;
        dropDownsStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        dropDownDataStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
    }
    else {
        getAssignedItemID = () => data.requestRows.find(row => row.assigned_child_id != null)?.req_id;
        getAssignedItemIdx = () => data.requestRows.findIndex(row => row.assigned_child_id != null);
        dropdownItems = data.requestedItems;
        dropDownsStates = false;
        dropDownDataStates = false;
    }
</script>

{#if data.requestType !== 'class'}
    {#each Object.entries(data.requestedItems) as item, index1}
        <p class="mb-0.5"> • {getDisplayName(item) || `(declined ${data.requestType}s)`}</p>
        {#each getRequestRows(item) as requestRow, index2}
            {#if requestRow?.equipment_type != 'For Printing Only'}
                <p class="mb-1"> 
                    <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
                            bg-gradient-to-r { dropDownDataStates[index1][index2] ? 'from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-600' :
                            getAssignedItemID(requestRow) ? 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-600' : 'from-red-400 to-red-600 hover:from-red-500 hover:to-red-600'}">
                        { dropDownDataStates[index1][index2] ? 'Unsaved Change' : getAssignedItemID(requestRow) ? 'Assigned' : 'Unavailable' }
                        <ChevronDownOutline class="w-4 h-5 ml-3"/>
                    </Button>
                    <Dropdown bind:open={dropDownsStates[index1][index2]} class="max-w-80 overflow-y-auto py-1 max-h-48">
                        {#each [{type: item[0], id: null, name: 'Unavailable'}].concat(dropdownItems) as dropDownItem}
                            {#if mustDisplayDropdown(dropDownItem, item) }
                                <DropdownItem 
                                    class="flex items-center" 
                                    on:mouseenter={() => hoveredItem = dropDownItem.id ?? -1}
                                    on:mouseleave={() => hoveredItem = null}
                                    on:click={() => { 
                                        dropDownsStates[index1][index2] = false; 
                                        if (dropDownItem.id !== getAssignedItemID(requestRow)) {
                                            dropDownDataStates[index1][index2] = true;
                                            form.querySelector(`input[name="${data.requestType}_id_${requestRow?.req_id}"]`).value = dropDownItem.id ?? -1;
                                        }
                                        else {
                                            dropDownDataStates[index1][index2] = false;
                                            form.querySelector(`input[name="${data.requestType}_id_${requestRow?.req_id}"]`).value = '';
                                        }
                                    }}>
                                    {dropDownItem.name}
                                    <ChevronRightOutline class="{dropDownItem.id ? '' : 'hidden'}"/>
                                </DropdownItem>
                                {#if dropDownItem.id === null}<DropdownDivider />{/if}
                                {#if hoveredItem === dropDownItem.id}
                                    <Dropdown placement="right-start" class="w-80" open>
                                        {#if data.requestType === 'equipment'}
                                            <DropdownItem> Current Status: {dropDownItem?.status?.charAt(0).toUpperCase() + dropDownItem?.status?.slice(1)} </DropdownItem>
                                            <DropdownItem> Location: {dropDownItem?.location || '-'} </DropdownItem>
                                            <DropdownItem> Description: {dropDownItem?.notes || '-'} </DropdownItem>
                                            <DropdownItem slot="footer"> Reserved Dates: {'-'} </DropdownItem>
                                        {:else if data.requestType === 'venue'}
                                            <DropdownItem> Current Status: {'-'} </DropdownItem>
                                            <DropdownItem> Description: {dropDownItem?.description || '-'} </DropdownItem>
                                            <DropdownItem slot="footer"> Reserved Dates: {'-'} </DropdownItem>
                                        {/if}
                                    </Dropdown>    
                                {/if}
                            {/if}
                        {/each}
                    </Dropdown>
                </p>
            {/if}
        {/each}
    {/each}
{:else}
    <p>{postgresTimeToTimeslot(data.requestedItems[getAssignedItemIdx()]) || 'No final timeslot assigned yet'}</p>
    <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
        bg-gradient-to-r { dropDownDataStates ? 'from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-600' :
        getAssignedItemIdx() != -1 ? 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-600' : 'from-red-400 to-red-600 hover:from-red-500 hover:to-red-600'}">
    { dropDownDataStates ? 'Unsaved Change' : getAssignedItemIdx() != -1 ? 'Assigned' : 'None' }
    <ChevronDownOutline class="w-4 h-5 ml-3"/>
    </Button>
    <Dropdown bind:open={dropDownsStates} class="max-w-80 overflow-y-auto py-1 max-h-48">
        {#each [[undefined, undefined, -1]].concat(data.requestedItems) as dropDownItem, index}
            <DropdownItem 
                class="flex items-center" 
                on:click={() => { 
                    dropDownsStates = false; 
                    data.requestRows.forEach((_,_i) => form.querySelector(`input[name="${data.requestType}_id_${data.requestRows[_i].req_id}"]`).value = 'null')
                    
                    const req_id = index == 0 ? undefined : data.requestRows[index-1].req_id;
                    console.log(dropDownItem)
                    console.log(postgresTimeToTimeslot(dropDownItem))
                    console.log(getAssignedItemIdx())
                    console.log(data.requestedItems[getAssignedItemIdx()])
                    if (postgresTimeToTimeslot(dropDownItem) !== (data.requestedItems[getAssignedItemIdx()])) {
                        dropDownDataStates = true;
                        form.querySelector(`input[name="${data.requestType}_id_${req_id}"]`).value = 0;
                    } 
                    else { dropDownDataStates = false; }
                }}>
                {dropDownItem.length > 2 ? 'No available preferred timeslot' : postgresTimeToTimeslot(dropDownItem)}
            </DropdownItem>
            {#if dropDownItem.length > 2 }<DropdownDivider />{/if}
        {/each}
    </Dropdown>
{/if}

