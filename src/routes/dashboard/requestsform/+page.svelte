<script>
    /** @type {import('./$types').PageData} */
	export let data;
    import { browser } from "$app/environment";
    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, } from "flowbite-svelte";
    import { AddressBookOutline, ArrowLeftOutline, BuildingSolid, ChevronLeftOutline, ComputerSpeakerSolid, UserAddSolid, } from "flowbite-svelte-icons";
    
    let equipmentTypes = data.equipmentTypes;
    let selectedEq = [];
    let start_time = "";
    let return_time = "";

    // Add a 'value' property to each object in the array
    equipmentTypes = equipmentTypes.map((item) => ({ ...item, value: item.type, name: item.type }));
    console.log(equipmentTypes)

    let selectedDept = "";
    $: isOther = selectedDept == "other";
    let depts = [
        { value: "DCTID", name: "Department of Clothing, Textiles, and Interior Design" },
        { value: "DFLCD", name: "Department of Family Life and Child Development" },
        { value: "DFSN", name: "Department of Food Science and Nutrition" },
        { value: "DHeEd", name: "Department of Home Economics Education" },
        { value: "DHRIM", name: "Department of Hotel, Restaurant, and Institution Management" },
        { value: "other", name: "Other..." },
    ];
</script>

<div class="px-10 py-10">
    <!--header-->
    <div class="flex items-center gap-4 mb-5">
        <Button
            color="alternative"
            href="/dashboard"
            class="w-auto p-0"><ChevronLeftOutline size="xl" /></Button
        >
        <h4
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
            Request Form
        </h4>
    </div>
    <Tabs tabStyle="pill">
        <TabItem open>
            <span slot="title" class="flex gap-2"><ComputerSpeakerSolid/>Equipment</span>
            <Card class="max-w-full">
                <form class="flex flex-col space-y-6" method="POST">
                    <h3
                        class="text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Borrowing Equipment
                    </h3>
                    <hr />
                    <Label class="space-y-2">
                        <span>Equipment</span>
                        <MultiSelect
                        tabindex=0
                            name="selectedEq"
                            class="mt-2"
                            items={equipmentTypes}
                            bind:value={selectedEq}
                            required
                        />
                    </Label>
                    <div class="grid gap-6 mb-6 md:grid-cols-4">
                        {#each selectedEq as eq}
                            <Label>
                                <span>Quantity of {equipmentTypes.find(
                                    (x) => x.value == eq,
                                ).name}</span
                            >
                            <Input type="number" name={eq} min=1 max={equipmentTypes.find((x) => x.value == eq, ).count} required /> 
                            </Label>
                        {/each}
                    </div>
                    <hr />
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <Label class="space-y-2">
                            <span>Borrow Time</span>
                            <Input type="datetime-local" name="borrow_time" bind:value={start_time} required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Return Time</span>
                            <Input type="datetime-local" name="return_time" bind:value={return_time} required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Venue of Equipment Usage</span>
                            <Input type="text" name="venue" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Purpose</span>
                            <Textarea
                                rows="1"
                                type="text"
                                name="purpose"
                                required
                            />
                        </Label>
                        <Label class="space-y-2">
                            <span>Name of Coordinating Faculty/Admin</span>
                            <Input type="faculty_name" name="name" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Email of Coordinating Faculty/Admin</span>
                            <Input type="faculty_email" name="email" required />
                        </Label>
                    </div>
                    <GradientButton shadow color="green"  type="submit">
                        Request
                    </GradientButton>
                </form>
            </Card>
        </TabItem>
        <TabItem>
            <span slot="title" class="flex gap-2"><BuildingSolid/>Venue</span>
            <Card class="max-w-full">
                <form class="flex flex-col space-y-6" action="/">
                    <h3
                        class="text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Reserve a Venue
                    </h3>
                    <hr />
                    <div>
                        <Label class="space-y-2">
                            <span>Room</span>
                            <Input type="text" name="room" required />
                        </Label>
                    </div>
                    
                    <hr />
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <Label class="space-y-2">
                            <span>Activity</span>
                            <Input type="text" name="activity" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Use Date</span>
                            <Input type="date" name="dateneeded" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Acitivity Start Time</span>
                            <Input type="time" name="start_time" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Acitivity End Time</span>
                            <Input type="time" name="end_time" required />
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
                    </div>
                    <GradientButton shadow color="green" type="submit">
                        Request
                    </GradientButton>
                </form>
            </Card>
        </TabItem>
    </Tabs>

    <!--actual form-->
</div>
