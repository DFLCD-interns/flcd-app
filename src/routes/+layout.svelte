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
