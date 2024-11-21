<script>
    import { InfoCircleOutline } from 'flowbite-svelte-icons';

    export let data;
    export let form;

    console.log(data);

    $: emailDetails = {
        request: {
            id: data.requestID,
            name: data.requestName,
            type: data.requestType, 
            date_start: data.startDate,
            date_end: data.requestDetails[0]?.promised_end_time || data.endDate,
            location: data.requestDetails[0]?.location,
            remarks: data.approvalForms.remarks,
            statuses: data.approvalForms.statuses,
            requested: data.requestedItems,
            assigned: data.requestDetails[0]?.child_name || data.requestDetails.map(x => [x.equipment_name, x.location])
        },
        requester: {
            id: data.requestDetails[0]?.requester_id,
            name: data.requestDetails[0]?.requester_firstname + ' ' + data.requestDetails[0]?.requester_lastname,
            email: data.requestDetails[0]?.email,
            contactNum: data.requestDetails[0]?.contactno,
            department: data.requestDetails[0]?.dept,
            access_level: data.requestDetails[0]?.requester_access_level
        },
        approver: {
            name: data.current_user?.first_name + ' ' + data.current_user?.last_name,
            email: data.current_user?.email,
            staffEmails: data.staffEmails
        }
    }

    $: emailDetailsEncoded = encodeURIComponent(JSON.stringify(emailDetails));

</script>

<div class="pt-10 bg-white rounded-lg p-8 shadow-md">
    <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Response Form</h1>                    
    {#if data?.approvalForms.canRespond }
        <form bind:this={form} action="?/approve&emailDetails={emailDetailsEncoded}" method="POST">
            <div class="relative mb-4">
                <textarea 
                    id="remarks" 
                    name="remarks" 
                    placeholder="Comments for requester and approvers."
                    class="overflow-y-auto min-h-24 mt-1.5 w-80 bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out"/>
            </div>
            <div class="flex">
                <InfoCircleOutline class="size-xs" /> 
                <p class="text-gray-600 text-sm mb-1 ml-1"> You can modify your response as long as the next approver has not responded yet and the request is open.</p>
            </div>
            <div class="flex justify-center">
                <!-- Hidden input fields to store status and assigned items -->
                <input type="hidden" id="status" name="status" />
                {#if data.requestType == 'equipment'}
                    {#each Object.entries(data.requestedItems) as item}
                        {#each data.requestRows?.filter(row => row.equipment_type == item[0]) as requestRow}
                            <input type="hidden" name="{data.requestType}_id_{requestRow?.req_id}" />
                        {/each} 
                    {/each}
                {:else}
                    {#each data.requestRows as requestRow}            
                        <input type="hidden" name="{data.requestType}_id_{requestRow?.req_id}" />
                    {/each} 
                {/if}

                <button 
                    on:click={() => form.querySelector('input[name="status"]').value = "approved"}
                    type="submit" 
                    class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-600">
                    Approve
                </button>
                <button
                    on:click={() => form.querySelector('input[name="status"]').value = "declined"}
                    type="submit" 
                    class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-600">
                    Decline
                </button>
            </div>
        </form>
    {:else}
        <div class="flex">
            <InfoCircleOutline class="size-xs" /> 
            <p class="text-gray-600 text-sm mb-1 ml-1"> You can no longer modify your response for this request because it is closed (declined, expired, or fully approved).</p>
        </div>
    {/if}
</div>   