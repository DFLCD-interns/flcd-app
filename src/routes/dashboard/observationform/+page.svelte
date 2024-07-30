<script>
    
    /** @type {import('./$types').PageData} */
	//export let data;
    import amclassesdata from "../../../lib/amclassesdata.json";
    import pmclassesdata from "../../../lib/pmclassesdata.json";
    import { browser } from "$app/environment";
    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, Radio, Alert } from "flowbite-svelte";
    import { AddressBookOutline, AddressBookSolid, ArrowLeftOutline, BuildingSolid, CheckCircleSolid, ChevronLeftOutline, ComputerSpeakerSolid, MoonSolid, SunSolid, TrashBinSolid, UserAddSolid, } from "flowbite-svelte-icons";
    
    function navBack() {
        if (browser) window.history.back();
    }
    // function printStuff(){
    //     console.log(dateTimeRows)
    // }
    let requesterSection = ""
    let dateTimeRows = [{ date: '', time: '', available: false}];
    function addRow() {
        dateTimeRows = [...dateTimeRows, { date: '', time: '',  available: false}];
    }
    function deleteRow(index) {
        dateTimeRows = dateTimeRows.filter((_, i) => i !== index);
    }
    let classtime = ""
    let selectedClass = ""
    let selectedDate = ""
    let selectedSlot = ""
    let sections = [
        {
            name: "FLCD 123",
            value: "FLCD123"
        },
        {
            name: "FLCD 101",
            value: "FLCD101"
        },
        {
            name: "FLCD 195",
            value: "FLCD195"
        },
    ]
    let amslots = [
        {
            name: "8:00 - 9:00",
            value: "8-9"
        },
        {
            name: "9:00 - 10:00",
            value: "9-10"
        },
        {
            name: "10:00 - 11:00",
            value: "10-11"
        }
    ]
    let pmslots = [
        {
            name: "1:00 - 2:00",
            value: "1-2"
        },
        {
            name: "2:00 - 3:00",
            value: "2-3"
        },
        {
            name: "3:00 - 4:00",
            value: "3-4"
        }
    ]
    let unavailable = ["AM-TC 2024-07-25 8-9", "AM-TC 2024-07-25 10-11", "PM-TC 2024-07-25 8-9"]
    function isSlotAvailable(section, date, time) {
        return !unavailable.includes(`${section} ${date} ${time}`);
    }
    function updateAvailability(index, date, time) {
        dateTimeRows[index].available = isSlotAvailable(selectedClass, date, time);
    }
    $: canRequest = dateTimeRows.length >= 1 && dateTimeRows.every(row => row.available);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${day}-${month}`;
</script>

<div class="px-10 py-10">
    <!--header-->
    <div class="flex items-center gap-4 mb-5">
        <Button
            on:click={() => {
                navBack();
            }}
            color="alternative"
            class="w-auto p-0"><ChevronLeftOutline size="xl" /></Button
        >
        <h5
            class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
            Request Form
        </h5>
    </div>
    <Tabs tabStyle="pill">
        <TabItem open>
            <span slot="title" class="flex gap-2"><AddressBookSolid/>Observation</span>
            <Card class="max-w-full">
                <form class="flex flex-col space-y-6" method="POST">
                    <h3
                        class="text-xl font-medium text-gray-900 dark:text-white"
                    >
                        Observation Request
                    </h3>
                    <hr />
                    <div class="grid gap-6 mb-6 md:grid-cols-3">
                        <Label class="space-y-2">
                            <span>Your section</span>
                            <Select class="mt-2" name="requesterSection" items={sections} bind:value={requesterSection} required/>
                        </Label>
                        <Label class="space-y-2">
                            <span>Class time to be observed</span>
                            <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600 h-min">
                                <li class="w-full"><Radio value="AM" name="classTime" class="p-3" bind:group={classtime} on:change={()=>{selectedClass = ""; selectedDate =""; selectedSlot=""}}>AM</Radio></li>
                                <li class="w-full"><Radio value="PM"name="classTime" class="p-3" bind:group={classtime} on:change={()=>{selectedClass = ""; selectedDate =""; selectedSlot=""}}>PM</Radio></li>
                              </ul>
                        </Label>
                        {#key classtime}
                        <Label class="space-y-2">
                            <span color="black">{classtime} Class</span>
                            <Select 
                                class="mt-2"
                                items={(classtime == "AM" ? amclassesdata : pmclassesdata)}
                                disabled={(classtime == "")}
                                required
                                name="selectedClass"
                                bind:value={selectedClass} />
                        </Label>
                        {/key}
                        </div>
                        <hr>
                        <Button size="sm" class="md:col-span-2" on:click={addRow}>Add Slot ({dateTimeRows.length})</Button>

                        {#each dateTimeRows as row, index}
                        <div>
                            <div class="flex justify-end">
                                <Button class="block !p-2 mb-2 align-self-end" color="red" size="sm" outline on:click={() => deleteRow(index)}><TrashBinSolid/></Button>
                            </div>
                        
                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            
                        {#key classtime}
                        <Label class="space-y-2">
                            <span>Date of Observation</span>
                            
                            <Input type="date" bind:value={row.date} name="selectedDate" disabled={(classtime == "")} min={currentDate} required on:change={(e) => updateAvailability(index, e.target.value, row.time)}></Input>
                        </Label>
                            
                            
                            <Label class="space-y-2">
                                <span color="black">{classtime} Timeslot</span>
                                <Select
                                    class="mt-2"
                                    items={(classtime == "AM" ? amslots : pmslots)}
                                    disabled={(classtime == "")}
                                    required
                                    name="selectedSlot"
                                    bind:value={row.time}
                                    on:change={(e) => updateAvailability(index, row.date, e.target.value)} />
                            </Label>
                        {/key}
                        <div class="md:col-span-2">
                            {#key row.available, row.date, row.time}
                            {#if row.date != '' && row.time != ''}
                                {#if row.available}
                                    <Alert border color="green" dismissable>
                                        <span class="font-medium">Slot is available.</span>
                                        You may request this slot!
                                    </Alert>
                                    {:else}
                                    <Alert border color="red" dismissable>
                                        <span class="font-medium">Slot is unavailable.</span>
                                        Please try another timeslot.
                                    </Alert>
                                {/if}
                                {:else}
                                <Alert border color="yellow" dismissable>
                                    <span class="font-medium">Please answer the above fields to be able to request.</span>
                                </Alert>
                            {/if}
                            {/key}
                        </div>
                    </div>
                    
                    </div>
                    <hr>
                    {/each}
                    <!-- <Button on:click={()=>{printStuff()}}>check</Button> -->
                    <GradientButton shadow color="green"  type="submit" disabled={!canRequest}>
                        Request
                    </GradientButton>
                </form>
            </Card>
        </TabItem>
    </Tabs>
</div>
