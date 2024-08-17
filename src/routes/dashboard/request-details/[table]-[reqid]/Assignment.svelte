<script>
    import { A, Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
    import { postgresTimeToReadable, postgresTimeToTimeslot } from '$lib';
    import { format } from 'date-fns';

    export let data;
    export let form;
    
    let hoveredItem, dropDownsStates, dropDownDataStates;
    let getRequestRows, getDisplayName, dropdownItems, getAssignedItemID, mustDisplayDropdown, getReservedDates;
    if (data.requestType === 'equipment') {
        getDisplayName = (item) => item[0];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.equipment_type == getDisplayName(item)) || [];
        dropdownItems = data.equipments;
        getAssignedItemID = (requestRow) => requestRow.equipment_id;
        mustDisplayDropdown = (dropDownItem, item) => dropDownItem.type === getDisplayName(item);
        dropDownsStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        dropDownDataStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        
        const reservedDates = data.equipmentsStatuses;
        getReservedDates = (item) => reservedDates.map(
            row => (row.equip_id == item.id) && (row.promised_end_time > new Date()) ? 
            [row.promised_start_time, row.promised_end_time] : null).filter(notnull => notnull);
    }
    else if (data.requestType === 'venue') {
        getDisplayName = (item) => item[1];
        getRequestRows = (item) => data?.requestRows?.filter(row => row.name == getDisplayName(item)) || [];
        dropdownItems = data.venues;
        getAssignedItemID = (requestRow) => requestRow?.venue_id;
        mustDisplayDropdown = (dropDownItem, item) => true;
        dropDownsStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        dropDownDataStates = Object.entries(data.requestRows).map(item => getRequestRows(item)?.map(() => false));
        
        const reservedDates = data.venuesStatuses.map((row) => 
            [row.venue_id, new Date(format(row.date, 'yyyy-MM-dd') + 'T' + row.start), new Date(format(row.date, 'yyyy-MM-dd') + 'T' + row.end)])

        getReservedDates = (item) => reservedDates.map(
            row => (row[0] == item.id) && (row[2] > new Date()) ? 
            [row[1], row[2]] : null).filter(notnull => notnull);
    }
    else {
        getAssignedItemID = () => data.requestRows[0].assigned_child_id;
        getDisplayName = (item) => item[1];
        dropdownItems = data.childs;
        dropDownsStates = false;
        dropDownDataStates = false;

        const reservedDates = data.childsStatuses.map((row) => {
            const desiredDate = new Date(format(row.date, 'yyyy-MM-dd'));
            const period = row.timeslot.split('-');
            const desiredStartDate = new Date(desiredDate.setHours(period[0]));
            const desiredEndDate = new Date(desiredDate.setHours(period[1]));
            return [row.child_id, desiredStartDate, desiredEndDate]
        })
        getReservedDates = (item) => reservedDates.map(
            row => (row[0] == item.id) && (row[2] > new Date()) ? 
            [row[1], row[2]] : null).filter(notnull => notnull);
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
                                    on:mouseenter={() => hoveredItem = dropDownItem.id ?? null}
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
                                {#if hoveredItem && hoveredItem === dropDownItem.id}
                                    <Dropdown placement="right-start" class="w-80" open>
                                        {#if data.requestType === 'equipment'}
                                            {@const _reservedDates = getReservedDates(dropDownItem) || []} 
                                            <DropdownItem> Current Status: {(dropDownItem?.status?.charAt(0).toUpperCase() + dropDownItem?.status?.slice(1)) || '???'} </DropdownItem>
                                            <DropdownItem> Location: {dropDownItem?.location || 'Not specified'} </DropdownItem>
                                            <DropdownItem class="border-b border-blue-gray-200"> Description: {dropDownItem?.notes || 'None'} </DropdownItem>
                                            <DropdownItem> 
                                                <p class="mb-2">Reserved Dates: {_reservedDates.length > 0 ? '' : 'None'}</p>
                                                {#each _reservedDates as date}
                                                    <p> {'• ' + postgresTimeToTimeslot(date)}</p>
                                                {/each}
                                            </DropdownItem>
                                        {:else if data.requestType === 'venue'}
                                            {@const _reservedDates = getReservedDates(dropDownItem) || []} 
                                            <DropdownItem class="border-b border-blue-gray-200"> Description: {dropDownItem?.description || 'None'} </DropdownItem>
                                            <DropdownItem> 
                                                <p class="mb-2">Reserved Dates: {_reservedDates.length > 0 ? '' : 'None'}</p>
                                                {#each _reservedDates as date}
                                                    <p> {'• ' + postgresTimeToTimeslot(date)}</p>
                                                {/each}
                                            </DropdownItem>
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
    <p>{data.requestDetails[0].child_name || 'No child assigned yet'}</p>
    <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
        bg-gradient-to-r { dropDownDataStates ? 'from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-600' :
        getAssignedItemID() ? 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-600' : 'from-red-400 to-red-600 hover:from-red-500 hover:to-red-600'}">
    { dropDownDataStates ? 'Unsaved Change' : getAssignedItemID() ? 'Assigned' : 'None' }
    <ChevronDownOutline class="w-4 h-5 ml-3"/>
    </Button>
    <Dropdown bind:open={dropDownsStates} class="max-w-80 overflow-y-auto py-1 max-h-48">
        {#each [{id: 'null', name:"No available child"}].concat(dropdownItems) as dropDownItem, index}
            <DropdownItem 
                class="flex items-center" 
                on:mouseenter={() => hoveredItem = dropDownItem.id ?? null}
                on:mouseleave={() => hoveredItem = null}
                on:click={() => { 
                    dropDownsStates = false; 
                    if ((dropDownItem.id == 'null' ? null : dropDownItem.id) !== getAssignedItemID()) {
                        dropDownDataStates = true;
                        data.requestRows.forEach((_,_i) => form.querySelector(`input[name="${data.requestType}_id_${data.requestRows[_i].req_id}"]`).value = dropDownItem.id)
                    } 
                    else { 
                        data.requestRows.forEach((_,_i) => form.querySelector(`input[name="${data.requestType}_id_${data.requestRows[_i].req_id}"]`).value = '')
                        dropDownDataStates = false; 
                    }
                }}>
                {dropDownItem.name}
                <ChevronRightOutline class="{dropDownItem.id !== 'null' ? '' : 'hidden'}"/>
            </DropdownItem>
            {#if dropDownItem.id == 'null' }<DropdownDivider />{/if}
            {#if hoveredItem && hoveredItem === dropDownItem.id}
                <Dropdown placement="right-start" class="w-80" open>
                    {@const _reservedDates = getReservedDates(dropDownItem) || []} 
                    <DropdownItem> Class: {dropDownItem?.class_id || 'None'} </DropdownItem>
                    <DropdownItem class="border-b border-blue-gray-200"> Birth Date: { postgresTimeToReadable(dropDownItem?.birthdate, 'MMMM d, yyyy') || 'None'} </DropdownItem>
                    <DropdownItem> 
                        <p class="mb-2">Reserved Dates: {_reservedDates.length > 0 ? '' : 'None'}</p>
                        {#each _reservedDates as date}
                            <p> {'• ' + postgresTimeToTimeslot(date)}</p>
                        {/each}
                    </DropdownItem>
                </Dropdown>    
            {/if}
        {/each}
    </Dropdown>
{/if}

