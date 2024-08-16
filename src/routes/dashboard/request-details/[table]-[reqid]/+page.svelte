<script>
    import {Badge, Button, GradientButton } from 'flowbite-svelte'
    import { ArrowLeftOutline, TrashBinSolid, InfoCircleOutline } from 'flowbite-svelte-icons';
    import { statusColors, postgresTimeToReadable, postgresTimeToTimeslot } from '$lib';
    import Assignment from './Assignment.svelte';
    import ApprovalStatus from './ApprovalStatus.svelte';
    import ResponseForm from './ResponseForm.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    export let form;

    let requestDetails = data?.requestDetails[0];
    let requestTypeDisplay = data.requestType?.charAt(0).toUpperCase() + data.requestType.slice(1) + " Requests";

    $: totalStatus = data?.approvalForms.totalStatus;
    const isAdmin = data?.current_user?.access_level < 5;
    
</script>


<div class = "min-h-screen p-10">
    <div class="w-full items-center justify-between">
        <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
        <div class="w-full items-center justify-between flex">
            <div>    
                <h2 class="pt-3 text-2xl font-semibold text-gray-600">{requestTypeDisplay}: {data.requestName}</h2>
                <Badge class="mt-2" large border color='{totalStatus === 'approved' ? statusColors.approved : totalStatus === 'declined' ? statusColors.declined : statusColors.pending}'>{totalStatus?.charAt(0)?.toUpperCase() + totalStatus?.slice(1)}</Badge>
            </div>
            {#if !isAdmin}
                <form bind:this={form} action="..?/deleteRequest" method="POST">
                    <input hidden="true" id="request_table_name" name="request_table_name" />
                    <input hidden="true" id="request_id" name="request_id" />
                    <GradientButton color="red" type="submit" on:click={() => {
                        form.querySelector(`input[id="request_table_name"]`).value = data.requestType + '_requests';
                        form.querySelector(`input[id="request_id"]`).value = data.requestID;
                        }} >
                        <TrashBinSolid/>
                    </GradientButton>
                </form>
            {/if}
        </div>
    </div>
    <div class="min-w-full md:flex pt-5 gap-10 justify-center">
        <div class="bg-white flex justify-center rounded-lg shadow-lg p-6" style="min-width: 42em;">
            <div class="overflow-x-auto">
            <table class="table-fixed object-cover">
                <tbody class="text-gray-600">
                <tr class="border-b border-blue-gray-200"/>
                <tr>
                    <td class="py-3 px-4 font-semibold">Name</td>
                    <td class="py-3 px-4">{requestDetails.requester_firstname} {requestDetails.requester_lastname}</td>
                </tr>
                <tr>
                    <td class="py-3 px-4 font-semibold">Email</td>
                    <td class="py-3 px-4">{requestDetails.email}</td>
                </tr>
                <tr>
                    <td class="py-3 px-4 font-semibold">Student Number</td>
                    <td class="py-3 px-4">{requestDetails.studentno || 'none'}</td>
                </tr>
                <tr>
                    <td class="py-3 px-4 font-semibold">Contact Number</td>
                    <td class="py-3 px-4">{requestDetails.contactno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/Section</td>
                    <td class="py-3 px-4">{requestDetails.dept}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Coordinating Instructor</td>
                    <div class="py-3 px-4">
                        <tr>{requestDetails.admin_firstname} {requestDetails.admin_lastname}</tr>
                        <tr>{requestDetails.adminemail}</tr>
                    </div>
                </tr>
                {#if data.requestType === 'equipment'}
                    <tr>
                        <td class="py-3 px-4 font-semibold">Promised Date of Borrowing</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(data.startDate)}</td>
                    </tr>
                    <tr>
                        <td class="py-3 px-4 font-semibold">Promised Date of Return</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(requestDetails.promised_end_time)}</td>
                    </tr>
                    <!-- <tr>
                        <td class="py-3 px-4 font-semibold">Actual Date of Borrowing</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(requestDetails.actual_start_time)}</td>
                    </tr>
                    <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4 font-semibold">Actual Date of Return</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(data.endDate)}</td>
                    </tr> -->
                    <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4 font-semibold">Location of Use/Activity</td>
                        <td class="py-3 px-4">{requestDetails.location}</td>
                    </tr>
                {:else if data.requestType === 'venue'} 
                    <tr>
                        <td class="py-3 px-4 font-semibold">Start Date</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(data.startDate)}</td>
                    </tr>
                    <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4 font-semibold">End Date</td>
                        <td class="py-3 px-4">{postgresTimeToReadable(data.endDate)}</td>
                    </tr>
                {/if}

                {#if data.requestType === 'class'}
                    <tr>
                        <td class="py-3 px-4 font-semibold">Preschool Class Assigned</td>
                        <td class="py-3 px-4"> {data.requestName}</td>
                    </tr>
                    <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4 font-semibold">Reserved Timeslots</td>
                        <td class="py-3 px-4"> 
                            {#each data.requestedItems as timeslot}
                                <p>• {postgresTimeToTimeslot(timeslot)}</p>
                            {/each}    
                        </td>
                    </tr>
                {/if}

                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4" >
                        {#if data.requestType === 'equipment'}
                            <p class="font-semibold"> Requested Equipment/s </p>
                        {:else if data.requestType === 'venue'}
                            <p class="font-semibold"> Requested Venue/s </p>
                        {:else}
                            <p class="font-semibold"> Child Assigned </p> 
                        {/if}
                        {#if isAdmin && data?.approvalForms.canRespond}
                            <div class="mt-2 flex">
                                <InfoCircleOutline class="size-xs" /> 
                                <p class="text-sm max-w-52 ml-1"> Be sure to approve the Response Form on the right to save your assignments here.</p>
                            </div>
                        {/if}
                    </td>
                    
                    <td class="py-3 px-4">
                        {#if isAdmin && data?.approvalForms.canRespond}
                            <Assignment data={data} form={form}/>     
                        {:else if data.requestType !== 'class'}
                            {#each data.requestName?.split(', ') as item}
                                <p>• {item}</p>
                            {/each}
                        {:else}
                            <p>{data.requestDetails[0].child_name || '(no child assigned yet)'}</p>
                        {/if}
                    </td> 
                </tr>


                {#if data.requestType === 'equipment'}
                    <tr>
                        <td class="py-3 px-4 font-semibold"> Assigned Equipment/s </td>
                        <td class="py-3 px-4">
                            {#each data.requestDetails as row}
                                <p>{row.equipment_name ? `• ${row.equipment_name} (at ${row.equipment_location || 'no specified location'})` : ''}</p>   
                            {/each}
                        </td>
                    </tr>
                {/if}


                </tbody>
            </table>
        </div>
    </div>
    <div class="space-y-10 relative" style="width: 24em;">
        <ApprovalStatus data={data}/>
        {#if isAdmin}
            <ResponseForm data={data} bind:form={form}/>
        {/if}
    </div>
  </div>
</div>