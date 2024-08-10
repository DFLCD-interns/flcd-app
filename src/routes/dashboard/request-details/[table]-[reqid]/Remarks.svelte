<!-- UNUSED -->

<script>
    export let data;
    $: approverRemarks = data?.approvalForms.remarks;
    $: approverNames = data?.approvalForms.displayNames;
</script>

<div class="pt-10 bg-white rounded-lg p-8 shadow-md">
    <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Remarks</h1>
    {#each approverRemarks as remarks, index}
    <!-- <p> { '"' + (remarks ?? '') + '"' } </p> -->
        {#if remarks}
            <p> { `"${remarks}"` } </p>
            <p class="text-gray-500 font-small"> &nbsp;&nbsp;&nbsp; {approverNames[index]}</p>
        {:else}
            <p> No remarks from <span class="text-gray-500 font-small">{approverNames[index]}</span></p>
            <!-- No remarks from
            <p class="text-gray-500 font-small"> &nbsp;&nbsp;&nbsp; {approverNames[index]}</p> -->
        {/if}    

    {/each}
</div>
