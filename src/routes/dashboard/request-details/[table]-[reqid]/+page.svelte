<script>
    /** @type {import('./$types').PageData} */
    export let data;
    export let form;
    // console.log('da,', data)

    import {Badge, Button, GradientButton, Dropdown, DropdownItem, DropdownDivider, DropdownHeader} from 'flowbite-svelte'
    import { ArrowLeftOutline, CodeBranchSolid, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import { statusColors } from '$lib';

    let requestDetails = data?.requestDetails[0];
    let request_type = "";

    if (data.requestType == "equipment_requests"){
        request_type = "Equipment Requests"
    }
    else if (data.requestType == "venue_requests"){
        request_type = "Venue Requests"
    }

    if (requestDetails.studentno == null){
        requestDetails.studentno = "none";
    }

    $: totalStatus = data?.approvalForms.totalStatus;
    $: approvalStatuses = data?.approvalForms.statuses;
    $: approverNames = data?.approvalForms.displayNames;
    $: approverRemarks = data?.approvalForms.remarks;
    
    let hoveredItem, dropDownsStates, dropDownDataStates;
    if (data.requestType.includes('equipment')) {
        dropDownsStates = Object.entries(data.requestedItems).map(item =>
            data.equipmentRequestRows.filter(row => row.equipment_type == item[0]).map(() => false));
        dropDownDataStates = Object.entries(data.requestedItems).map(item =>
            data.equipmentRequestRows.filter(row => row.equipment_type == item[0]).map(() => false));
    }

    // let equipmentRequestRows = data.equipmentRequestRows.map(row => row.request_id === data.requestID)


    // let requestInfo = {
    //     reqid: data.reqdetails.reqid,
    //     type: rtype,
    //     name: data.reqdetails.requester_firstname + data.reqdetails.requester_last_name,
    //     email: data.reqdetails.email,
    //     studentno: data.reqdetails.studentno,
    //     contactno: data.reqdetails.contactno,
    //     dateneeded: data.reqdetails.dateneeded,
    //     admin: data.reqdetails.admin_firstname + data.reqdetails.admin_lastname,
    //     dept: data.reqdetails.dept,
    //     material: data.reqdetails.material,
    //     number:data.reqdetails.number,
    //     room:data.reqdetails.room,
    //     adminemail:data.reqdetails.adminemail,
    //     returndate:data.reqdetails.returndate
    // }
    // console.log(requestInfo)

    // let requestInfo =
    //   {
    //     reqid:"0",
    //     status:"Pending",
    //     type:"Equipment Request",
    //     name:"Christian Magaway",
    //     email:"clmagaway@up.edu.ph",
    //     studentno:"None",
    //     contactno:"09218344896",
    //     dateneeded:"June 21, 2024",
    //     timeneeded:"8:00 AM",
    //     admin:"Asst. Prof. Joseph G. Taluban Jr.",
    //     dept:"DCTID",
    //     class:"None",
    //     course:"None",
    //     material:"Speaker",
    //     number:"1",
    //     reason:"Used for interior design mock board assessment and monitoring",
    //     usedate:"June 21, 2024",
    //     usetime:"8:00 AM",
    //     room:"CHE Museum Room 104",
    //     staff:"Ms. Mikee",
    //     adminemail:"jgtaluban@up.edu.ph",
    //     returndate:"June 21, 2024",
    //     returntime:"3:00 PM"
    //   }
</script>


<div class = "min-h-screen p-10">
    <div class="w-full items-center justify-between">
        <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
        <h2 class="pt-3 text-2xl font-semibold text-gray-600">{request_type}: {data.requestName}</h2>
        <Badge class="mt-2" large border color='{totalStatus === 'approved' ? statusColors.approved : totalStatus === 'declined' ? statusColors.declined : statusColors.pending}'>{totalStatus.charAt(0).toUpperCase() + totalStatus.slice(1)}</Badge>
    </div>
    <div class="min-w-full md:flex pt-5 gap-10 justify-center">
        <div class="bg-white flex items-center justify-center rounded-lg shadow-lg p-6">
            <div class="overflow-x-auto">
            <table class="table-fixed object-cover">
                <tbody class="text-gray-600">
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name</td>
                    <td class="py-3 px-4">{requestDetails.requester_firstname} {requestDetails.requester_lastname}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email</td>
                    <td class="py-3 px-4">{requestDetails.email}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Student Number</td>
                    <td class="py-3 px-4">{requestDetails.studentno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Contact Number</td>
                    <td class="py-3 px-4">{requestDetails.contactno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/Section</td>
                    <td class="py-3 px-4">{requestDetails.dept}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Promised Start Date</td>
                    <td class="py-3 px-4">{requestDetails.dateneeded}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Promised End/Return Date</td>
                    <td class="py-3 px-4">{requestDetails.returndate}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Location of Use/Activity</td>
                    <td class="py-3 px-4">{requestDetails.room}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name of Coordinating Instructor</td>
                    <td class="py-3 px-4">{requestDetails.admin_firstname} {requestDetails.admin_lastname}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email of Coordinating Instructor</td>
                    <td class="py-3 px-4">{requestDetails.adminemail}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Requesting the following</td>
                    <td class="py-3 px-4">
                        {#if data.current_user.access_level < 5 &&
                                data.requestType.includes('equipment') && // must be an equipment
                                (totalStatus !== 'approved' && totalStatus !== 'declined') && (
                                data.user_access_level === approverNames[Math.max(approvalStatuses.findLastIndex(status => status === 'approved'), 0)] || 
                                data.user_access_level === approverNames[Math.max(approvalStatuses.findIndex(status => status === 'pending'), 0)]) }
                            {#each Object.entries(data.requestedItems) as item, index1}
                                <p class="mb-0.5">• {item[0]}</p>
                                {#each data.equipmentRequestRows.filter(row => row.equipment_type == item[0]) as requestRow, index2}
                                    <p class="mb-1"> 
                                        <Button class="ml-1 mb-0.5 w-52 text-white py-2 px-6 rounded 
                                            bg-gradient-to-r { dropDownDataStates[index1][index2] ? 'from-amber-600 from-10% to-yellow-200 hover:from-amber-600 hover:to-amber-600' :
                                            requestRow.equipment_id ? 'from-green-600 from-10% to-lime-300 hover:from-green-600 hover:to-green-600' : 'from-red-600 to-rose-300 hover:from-red-600 hover:to-red-600'}">
                                            { dropDownDataStates[index1][index2] ? 'Unsaved Change' : requestRow.equipment_id ? 'Assigned' : 'Unassigned' }
                                            <ChevronDownOutline class="w-4 h-5 ml-3"/>
                                        </Button>
                                        <Dropdown bind:open={dropDownsStates[index1][index2]} class="max-w-80 overflow-y-auto py-1 max-h-48">
                                            {#each [{type: item[0], id: null, name: 'Remove Assignment'}].concat(data.equipments) as equipment}
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
                                {/each}
                            {/each}
                        {:else}
                            {data.requestName}
                        {/if}
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="space-y-10 relative">
        <div class="bg-white rounded-lg p-8 shadow-md">
            <h2 class="text-gray-600 text-lg mb-1 font-medium title-font">Approval Status</h2>
            {#each approvalStatuses as status, index} 
                <p class="text-gray-600" >
                    {index > 0 && approvalStatuses[index-1] === 'pending' ? '🔒 Invisible to' :
                        status === 'approved' ? '✔️ Approved by' : 
                        status === 'declined' ? '❌ Declined by' : 
                        totalStatus === 'declined' ? '🔒 Invisible to' :
                        status === 'pending' ?  '⌛ Pending with' : 
                                                'Status unknown with'}
                    {approverNames[index]}
                </p>
            {/each}
        </div>
        <div class="pt-10 bg-white rounded-lg p-8 shadow-md">
            <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Remarks</h1>
            {#each approverRemarks as remarks, index}
                <p> { '"' + (remarks ?? '') + '"' } </p>
                <p class="text-gray-500 font-small"> - {approverNames[index]}</p>
            {/each}
        </div>
        {#if data.current_user.access_level < 5}
            <div class="pt-10 bg-white rounded-lg p-8 shadow-md">
                {#if (totalStatus !== 'approved' && totalStatus !== 'declined') && (
                        data.user_access_level === approverNames[Math.max(approvalStatuses.findLastIndex(status => status === 'approved'), 0)] || 
                        data.user_access_level === approverNames[Math.max(approvalStatuses.findIndex(status => status === 'pending'), 0)]) }
                    <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Response Form</h1>                    
                    <form bind:this={form} action="?/approve" method="POST">
                        <div class="relative mb-4">
                            <input 
                                id="remarks" 
                                name="remarks" 
                                placeholder="To requester and next approver"
                                class="mt-1.5 w-80 bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <p class="text-gray-600 text-sm mb-1 font-small w-80">You can modify everything in this page as long as the next approver has not responded yet and the request is open.</p>

                        <div class="flex justify-center">
                            <!-- Hidden input fields to store status, and assigned equipments -->
                            <input type="hidden" id="status" name="status" />
                            {#if data.requestType.includes('equipment')}
                                 {#each Object.entries(data.requestedItems) as item}
                                     {#each data.equipmentRequestRows.filter(row => row.equipment_type == item[0]) as requestRow}
                                         <input type="hidden" name="equipment_id_{requestRow.id}" />
                                 {/each} {/each}
                            {/if}
                            <button 
                                on:click={() => form.querySelector('input[name="status"]').value = "approved"}
                                type="submit" 
                                class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">
                                Approve
                            </button>
                            <button
                                on:click={() => form.querySelector('input[name="status"]').value = "declined"}
                                type="submit" 
                                class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-red-600 to-rose-300 hover:from-red-600 hover:to-red-600">
                                Decline
                            </button>
                        </div>
                    </form>
                {:else}
                    <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Form Approval</h1>
                    <p class="text-gray-600 text-sm mb-1 font-small w-80">You can no longer modify your response for this request.</p>
                {/if}
            </div>            
        {/if}
    </div>
  </div>
</div>