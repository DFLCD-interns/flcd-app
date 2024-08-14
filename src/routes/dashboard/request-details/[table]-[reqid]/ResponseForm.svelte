<script>
    export let data;
    export let form;
</script>

<div class="pt-10 bg-white rounded-lg p-8 shadow-md">
    <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Response Form</h1>                    
    {#if data?.approvalForms.canRespond }
        <form bind:this={form} action="?/approve" method="POST">
            <div class="relative mb-4">
                <textarea 
                    id="remarks" 
                    name="remarks" 
                    placeholder="Comments for requester and approvers."
                    class="overflow-y-auto min-h-24 mt-1.5 w-80 bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 text-base outline-none text-gray-700 leading-6 transition-colors duration-200 ease-in-out"/>
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
        <p class="text-gray-600 text-sm mb-1 font-small w-80">You can no longer modify your response for this request.</p>
    {/if}
</div>   