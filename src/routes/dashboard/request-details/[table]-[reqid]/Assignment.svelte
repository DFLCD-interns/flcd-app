<script>
    import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

    export let data;
    export let form;
    
    let hoveredItem, dropDownsStates, dropDownDataStates;
    let getRequestRows, getDisplayName, dropdownItems, getAssignedItemID, shouldDisplay;
    if (data.requestType === 'equipment') {
        getDisplayName = (item) => item[0];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.equipment_type == getDisplayName(item)) || [];
        dropdownItems = data.equipments;
        getAssignedItemID = (requestRow) => requestRow.equipment_id;
        shouldDisplay = (dropDownItem, item) => dropDownItem.type === getDisplayName(item);
    }
    else if (data.requestType === 'venue') {
        getDisplayName = (item) => item[1];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.name == getDisplayName(item)) || [];
        dropdownItems = data.venues;
        getAssignedItemID = (requestRow) => requestRow?.venue_id;
        shouldDisplay = (dropDownItem, item) => true;
    }
    
    dropDownsStates = Object.entries(data.requestedItems).map(item => getRequestRows(item)?.map(() => false));
    dropDownDataStates = Object.entries(data.requestedItems).map(item => getRequestRows(item)?.map(() => false));
</script>

{#each Object.entries(data.requestedItems) as item, index1}
    <p class="mb-0.5">• {getDisplayName(item) || `(declined ${data.requestType}s)`}</p>
    {#each getRequestRows(item) as requestRow, index2}
        {#if requestRow?.equipment_type != 'For Printing Only'}
            <p class="mb-1"> 
                <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
                    bg-gradient-to-r { dropDownDataStates[index1][index2] ? 'from-amber-600 from-10% to-yellow-200 hover:from-amber-600 hover:to-amber-600' :
                    getAssignedItemID(requestRow) ? 'from-green-600 from-10% to-lime-300 hover:from-green-600 hover:to-green-600' : 'from-red-600 to-rose-300 hover:from-red-600 hover:to-red-600'}">
                    { dropDownDataStates[index1][index2] ? 'Unsaved Change' : getAssignedItemID(requestRow) ? 'Assigned' : 'Unavailable' }
                    <ChevronDownOutline class="w-4 h-5 ml-3"/>
                </Button>
                <Dropdown bind:open={dropDownsStates[index1][index2]} class="max-w-80 overflow-y-auto py-1 max-h-48">
                    {#each [{type: item[0], id: null, name: 'Unavailable'}].concat(dropdownItems) as dropDownItem}
                        {#if shouldDisplay(dropDownItem, item) }
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