<script>
    import AdminView from "./admin-view.svelte";
    import NonAdminView from "./non-admin-view.svelte";
    let isAdmin = true;
    function handleClick() {
        window.location.href = "/";
    }
</script>

{#if isAdmin}
    <AdminView></AdminView>
{:else} 
    <NonAdminView></NonAdminView>
{/if}

