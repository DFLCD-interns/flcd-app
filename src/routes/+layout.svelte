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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap">

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.gray.100");
        font-family: 'Open Sans', sans-serif;
    }
</style>

