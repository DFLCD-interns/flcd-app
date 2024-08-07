<script>
    /** @type {import('./$types').PageData} */
    export let data;
    export let form;
    
    import {Badge, Button, GradientButton} from 'flowbite-svelte'
    import { ArrowLeftOutline, CodeBranchSolid } from 'flowbite-svelte-icons';
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


<div class = "min-h-screen  p-10">
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
                    <td class="py-3 px-4 font-semibold">Student number</td>
                    <td class="py-3 px-4">{requestDetails.studentno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Contact number</td>
                    <td class="py-3 px-4">{requestDetails.contactno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/section</td>
                    <td class="py-3 px-4">{requestDetails.dept}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Requested equipment</td>
                    <td class="py-3 px-4">{data.requestName}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage date</td>
                    <td class="py-3 px-4">{requestDetails.dateneeded}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return date</td>
                    <td class="py-3 px-4">{requestDetails.returndate}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Room where the equipment will be used</td>
                    <td class="py-3 px-4">{requestDetails.room}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestDetails.admin_firstname} {requestDetails.admin_lastname}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email address of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestDetails.adminemail}</td>
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
                <p> { '"' + remarks + '"' } </p>
                <p class="text-gray-500 font-small"> - {approverNames[index]}</p>
            {/each}
        </div>
        {#if data.current_user.access_level < 5}
            <div class="pt-10 bg-white rounded-lg p-8 shadow-md">
                <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Form Approval</h1>
                {#if (totalStatus !== 'approved' && totalStatus !== 'declined') && (
                        data.user_access_level === approverNames[Math.max(approvalStatuses.findLastIndex(status => status === 'approved'), 0)] || 
                        data.user_access_level === approverNames[Math.max(approvalStatuses.findIndex(status => status === 'pending'), 0)] )}
                    <form bind:this={form} action="?/approve" method="POST">
                        <div class="relative mb-4">
                            <input 
                                id="remarks" 
                                name="remarks" 
                                placeholder="To requester and next approver"
                                class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                        </div>
                        <p class="text-gray-600 text-sm mb-1 font-small">You can change your response as long as the next approver has not responded yet and the request is open.</p>

                        <div class="flex justify-center">
                            <!-- Hidden input field to store the status -->
                            <input type="hidden" id="status" name="status" />
                            <button 
                                on:click={() => form.querySelector('input[name="status"]').value = "approved"}
                                type="submit" 
                                class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">
                                Approve
                            </button>
                            <button
                                on:click={() => form.querySelector('input[name="status"]').value = "declined"}
                                type="submit" 
                                class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">
                                Decline
                            </button>
                        </div>
                    </form>
                {:else}
                    <p class="text-gray-600 text-sm mb-1 font-small">You can no longer modify your response for this request.</p>
                {/if}
            </div>            
        {/if}
    </div>
  </div>
</div>