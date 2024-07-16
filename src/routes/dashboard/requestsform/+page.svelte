<script>
    import { browser } from "$app/environment";
    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, } from "flowbite-svelte";
    import { AddressBookOutline, ArrowLeftOutline, ChevronLeftOutline, UserAddSolid, } from "flowbite-svelte-icons";
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
    let selectedEq = [];
    let equipment = [
        { value: "l_microphone", name: "Lapel Microphone" },
        { value: "speaker", name: "Bluetooth Speaker" },
        { value: "projector", name: "Projector" },
        { value: "projector_screen", name: "Projector Screen" },
    ];
    let selectedDept = "";
    $: isOther = selectedDept == "other";
    let isStudent = false;
    let depts = [
        {
            value: "dflcd",
            name: "Department of Family Life and Child Development",
        },
        {
            value: "dctid",
            name: "Department of Clothing, Textiles, and Interior Design",
        },
        { value: "dfsn", name: "Department of Food Science and Nutrition" },
        { value: "other", name: "Other..." },
    ];
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
        <form  class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Borrowing Equipment
            </h3>
            <hr />
            <Label class="space-y-2">
                <span>Equipment</span>
                <MultiSelect
                    class="mt-2"
                    items={equipment}
                    bind:value={selectedEq}
                    required
                />
            </Label>
            <div class="grid gap-6 mb-6 md:grid-cols-4">
                {#each selectedEq as eq}
                    <Label>
                        <span
                            >Qty of {equipment.find((x) => x.value == eq)
                                .name}</span
                        >
                        <Input type="number" name="qty" required />
                    </Label>
                {/each}
            </div>
            <hr />
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <Label class="space-y-2">
                    <span>Use Date</span>
                    <Input type="date" name="dateneeded" required />
                </Label>
                <Label class="space-y-2">
                    <span>Use Time</span>
                    <Input type="time" name="timmeneeded" required />
                </Label>
                <Label class="space-y-2">
                    <span>Return Date</span>
                    <Input type="date" name="dateneeded" required />
                </Label>
                <Label class="space-y-2">
                    <span>Return Time</span>
                    <Input type="time" name="timmeneeded" required />
                </Label>
                <Label class="space-y-2">
                    <span>Venue</span>
                    <Input type="text" name="venue" required />
                </Label>
                <Label class="space-y-2">
                    <span>Purpose</span>
                    <Textarea rows=1 type="text" name="venue" required />
                </Label>
                <Label class="space-y-2">
                    <span>Name of Coordinating Faculty/Admin</span>
                    <Input type="name" name="name" required />
                </Label>
                <Label class="space-y-2">
                    <span>Email of Coordinating Faculty/Admin</span>
                    <Input type="email" name="email" required />
                </Label>
            </div>
            <hr />
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <Label>
                    <span>Department</span>
                    <Select
                        class="mt-2"
                        items={depts}
                        bind:value={selectedDept}
                    />
                </Label>
                {#key isOther}
                    <Label class="space-y-2">
                        <span>(Non-CHE) Department</span>
                        <Input
                            disabled={!isOther}
                            type="text"
                            name="department"
                        />
                    </Label>
                {/key}
                <Label class="space-y-2">
                    <span>Course</span>
                    <Input
                        type="text"
                        name="course"
                        required={isStudent}
                        disabled={!isStudent}
                    />
                </Label>
                <Label class="space-y-2">
                    <span>Preschool Section Assigned</span>
                    <Input
                        type="text"
                        name="pschool_section"
                        required={isStudent}
                        disabled={!isStudent}
                    />
                </Label>
               
            </div>
            <GradientButton shadow color="green"> Request </GradientButton>
        </form>
    </Card>
</div>
