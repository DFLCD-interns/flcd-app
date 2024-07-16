<script>
    import "../app.css";
    import { onNavigate } from '$app/navigation';
    /*
    onNavigate(() => {
        if (!document.startViewTransition) return;

        return new Promise((fulfil) => {
            document.startViewTransition(() => new Promise(fulfil))
        })
    })*/
</script>

<slot />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.gray.100");
    }
</style>

