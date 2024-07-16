<script>
    import { browser } from "$app/environment";
    import { Button, Card, Datepicker, Input, Label } from "flowbite-svelte";
    import {
        ArrowLeftOutline,
        ChevronLeftOutline,
    } from "flowbite-svelte-icons";
    function navBack() {
        if (browser) window.history.back();
    }

    let waiting = 0;
    const notifyLoaded = () => {
        window.location.reload();
    };

    const onload = (el) => {
        waiting++;
        el.addEventListener("load", () => {
            waiting--;
            if (waiting === 0) {
                notifyLoaded();
            }
        });
    };
</script>

<div class="px-10 py-10" use:onload>
    <!--header-->
    <div class="flex items-center gap-5 mb-5">
        <Button
            on:click={() => {
                navBack();
            }}
            color="alternative"
            class="w-auto"><ArrowLeftOutline size="md" /></Button
        >
        <h5
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
            Request Form
        </h5>
    </div>
    <!--actual form-->
    <Card class="max-w-full">
        <form class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Borrowing Equipment
            </h3>
            <Label class="space-y-2">
                <span>Email</span>
                <Input
                    type="text"
                    name="email"
                    placeholder="name@company.com"
                    required
                />
            </Label>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
            <Label class="space-y-2">
                <span>Date Needed</span>
                <Input type="date" name="dateneeded" required />
            </Label>
            <Label class="space-y-2">
                <span>Time Needed</span>
                <Input type="time" name="timmeneeded" required />
            </Label>
        </div>
        </form>
    </Card>
</div>
