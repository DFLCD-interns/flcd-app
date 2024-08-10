<script>
    import { Button, Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

    export let data;
    export let form;
    
    let hoveredItem, dropDownsStates, dropDownDataStates;
    if (data.requestType.includes('equipment')) {
        dropDownsStates = Object.entries(data.requestedItems).map(item =>
            data.equipmentRequestRows.filter(row => row.equipment_type == item[0]).map(() => false));
        dropDownDataStates = Object.entries(data.requestedItems).map(item =>
            data.equipmentRequestRows.filter(row => row.equipment_type == item[0]).map(() => false));
    }
</script>

{#each Object.entries(data.requestedItems) as item, index1}
    <p class="mb-0.5">• {item[0]}</p>
    {#each data.equipmentRequestRows.filter(row => row.equipment_type == item[0]) as requestRow, index2}
        {#if requestRow.equipment_type != 'For Printing Only'}
            <p class="mb-1"> 
                <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
                    bg-gradient-to-r { dropDownDataStates[index1][index2] ? 'from-amber-600 from-10% to-yellow-200 hover:from-amber-600 hover:to-amber-600' :
                    requestRow.equipment_id ? 'from-green-600 from-10% to-lime-300 hover:from-green-600 hover:to-green-600' : 'from-red-600 to-rose-300 hover:from-red-600 hover:to-red-600'}">
                    { dropDownDataStates[index1][index2] ? 'Unsaved Change' : requestRow.equipment_id ? 'Assigned' : 'Unavailable' }
                    <ChevronDownOutline class="w-4 h-5 ml-3"/>
                </Button>
                <Dropdown bind:open={dropDownsStates[index1][index2]} class="max-w-80 overflow-y-auto py-1 max-h-48">
                    {#each [{type: item[0], id: null, name: 'Unavailable'}].concat(data.equipments) as equipment}
                        {#if equipment.type === item[0]}
                            <DropdownItem 
                                class="flex items-center" 
                                on:mouseenter={() => hoveredItem = equipment.id ?? -1}
                                on:mouseleave={() => hoveredItem = null}
                                on:click={() => { 
                                    dropDownsStates[index1][index2] = false; 
                                    if (equipment.id !== requestRow.equipment_id) {
                                        dropDownDataStates[index1][index2] = true;
                                        form.querySelector(`input[name="equipment_id_${requestRow.id}"]`).value = equipment.id ?? -1;
                                    }
                                    else {
                                        dropDownDataStates[index1][index2] = false;
                                        form.querySelector(`input[name="equipment_id_${requestRow.id}"]`).value = '';
                                    }
                                }}>
                                {equipment.name}
                                <ChevronRightOutline class="{equipment.id ? '' : 'hidden'}"/>
                            </DropdownItem>
                            {#if equipment.id === null}<DropdownDivider />{/if}
                            {#if hoveredItem === equipment.id}
                                <Dropdown placement="right-start" class="w-80" open>
                                    <DropdownItem> Current Status: {equipment.status?.charAt(0).toUpperCase() + equipment.status?.slice(1)} </DropdownItem>
                                    <DropdownItem> Location: {equipment.location || '-'} </DropdownItem>
                                    <DropdownItem> Description: {equipment.notes || '-'} </DropdownItem>
                                    <DropdownItem slot="footer"> Reserved Dates: {'-'} </DropdownItem>
                                </Dropdown>    
                            {/if}
                        {/if}
                    {/each}
                </Dropdown>
            </p>
        {/if}
    {/each}
{/each}