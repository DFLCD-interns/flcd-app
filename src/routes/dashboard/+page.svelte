<script>
    /** @type {import('./$types').PageData} */
	export let data;
    import AdminView from "./admin-view.svelte";
    import NonAdminView from "./non-admin-view.svelte";
    let isAdmin =true;
    function handleClick() {
        window.location.href = "/";
    }
</script>

{#if isAdmin}
    <AdminView {data}></AdminView>
{:else} 
    <NonAdminView></NonAdminView>
{/if}

