<script>
    import {Badge, Button, GradientButton, Dropdown, DropdownItem, DropdownDivider, DropdownHeader} from 'flowbite-svelte'
    import { ArrowLeftOutline, CodeBranchSolid, ChevronDownOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
    import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
    import { statusColors } from '$lib';
    import Assignment from './Assignment.svelte';
    import ApprovalStatus from './ApprovalStatus.svelte';
    import ResponseForm from './ResponseForm.svelte';
    import { postgresTimeToReadable } from '$lib';

    /** @type {import('./$types').PageData} */
    export let data;
    export let form;

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
    const isAdmin = data?.current_user?.access_level < 5;
    
</script>


<div class = "min-h-screen p-10">
    <div class="w-full items-center justify-between">
        <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
        <h2 class="pt-3 text-2xl font-semibold text-gray-600">{request_type}: {data.requestName}</h2>
        <Badge class="mt-2" large border color='{totalStatus === 'approved' ? statusColors.approved : totalStatus === 'declined' ? statusColors.declined : statusColors.pending}'>{totalStatus.charAt(0).toUpperCase() + totalStatus.slice(1)}</Badge>
    </div>
    <div class="min-w-full md:flex pt-5 gap-10 justify-center">
        <div class="bg-white flex justify-center rounded-lg shadow-lg p-6">
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
                    <td class="py-3 px-4">{postgresTimeToReadable(requestDetails.dateneeded)}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Promised End/Return Date</td>
                    <td class="py-3 px-4">{postgresTimeToReadable(requestDetails.returndate)}</td>
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
                        {#if isAdmin && data.requestType.includes('equipment') && data?.approvalForms.canRespond}
                            <Assignment data={data} form={form}/>     
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
        <ApprovalStatus data={data}/>
        {#if isAdmin}
            <ResponseForm data={data} bind:form={form}/>
        {/if}
    </div>
  </div>
</div>