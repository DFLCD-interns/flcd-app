<script>
    /** @type {import('./$types').PageData} */
	export let data;
	export let form;

    import AdminView from "./admin-view.svelte";
    import NonAdminView from "./non-admin-view.svelte";
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import { page } from '$app/stores';

    onMount(() => {
        const urlParams = new URLSearchParams($page.url.search);
        const isRegistered = urlParams.get('registered');

        if (isRegistered) {
            toast.success('User created successfully!');
        }
    });

    let isAdmin = (data?.current_user?.access_level < 5);
    
    // console.log(`access_level: ${data.current_user.access_level}, ${isAdmin}`)
    function handleClick() {
        window.location.href = "/";
    }
    // console.log(data.current_user.user_id)
    // console.log(`request: ${data.equipment_requests.length}`)
</script>

{#if isAdmin}
    <AdminView {data} {form}></AdminView>
{:else} 
    <NonAdminView {data} {form}></NonAdminView>
{/if}

