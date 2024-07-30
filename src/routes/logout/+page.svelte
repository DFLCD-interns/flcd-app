<script>
    import { Button, Card } from "flowbite-svelte";
    import { browser } from "$app/environment";
    import { ChevronLeftOutline } from "flowbite-svelte-icons";
    function navBack() {
        if (browser) window.history.back();
    }

</script>
<div class="flex px-10 py-10 w-full h-auto justify-center">
<Card class="gap-3">
    <div class="flex items-center gap-4 mb-5">
        <h4
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
            Log out
        </h4>
    </div>
    <hr>
<p>Do you want to log out?</p>
<form method="POST" action="?/logout">
<Button color="red" class="w-full" type="submit">Log out</Button>
</form>
<Button color="alternative" on:click={() => {navBack()}}> <ChevronLeftOutline/>Back </Button>
</Card>
</div>