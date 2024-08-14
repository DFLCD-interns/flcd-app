<script>
  import { LockOutline, ThumbsUpOutline, CircleMinusOutline, BellOutline, ExclamationCircleOutline, QuoteSolid } from "flowbite-svelte-icons";

    export let data;
    $: totalStatus = data?.approvalForms.totalStatus;
    $: approverNames = data?.approvalForms.displayNames;
    $: approvalStatuses = data?.approvalForms.statuses;
    $: approverRemarks = data?.approvalForms.remarks;
</script>

<div class="bg-white rounded-lg p-8 shadow-md" style="min-width: 21em;">
    <h2 class="text-gray-600 text-lg mb-1 font-medium title-font">Approval Status & Remarks</h2>
    {#each approvalStatuses as status, index} 
        {@const invisibleColor = '#6D7E91'}
        <p>
            {#if index > 0 && approvalStatuses[index-1] === 'pending'}
                <LockOutline style="display: inline-block; color:{invisibleColor}"/> Invisible to
            {:else if status === 'approved'}
                <ThumbsUpOutline style="display: inline-block; color:#34ae7f"/> Approved by
            {:else if status === 'declined'}
                <CircleMinusOutline style="display: inline-block; color:#dc6868"/> Declined by
            {:else if totalStatus === 'declined'}
                <LockOutline style="display: inline-block; color:{invisibleColor}"/> Invisible to
            {:else if status === 'pending'}
                <BellOutline style="display: inline-block; color:#f2c539"/> Pending with
            {:else}
                <ExclamationCircleOutline style="display: inline-block; color:red"/> Status unknown with
            {/if}
            <span class="text-gray-600">{approverNames[index]}</span>
        </p>
        <p class='text-sm' style="font-style:italic">
            {#if approverRemarks[index]}
                <span class="pl-6" style="display: inline-block;">
                    <QuoteSolid size='sm' style="color:gray; position:absolute;"/>
                    <span style="display: inline-block; margin-left:1.5em;">
                        {approverRemarks[index]}
                    </span>
                </span>
            {/if}
        </p>
    {/each}
</div>