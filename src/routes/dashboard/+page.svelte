<script>
    import { ChevronSortOutline } from "flowbite-svelte-icons";
    /** @type {import('./$types').PageData} */
	export let data;
    import AdminView from "./admin-view.svelte";
    import NonAdminView from "./non-admin-view.svelte";
    let isAdmin = false;
    console.log(data.current_user.user_id)
    console.log(`request: ${data.equipment_requests.length}`)
</script>

{#if isAdmin}
    <AdminView {data}></AdminView>
{:else} 
    <NonAdminView {data}></NonAdminView>
{/if}

