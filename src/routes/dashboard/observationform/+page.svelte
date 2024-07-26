<script>
    
    /** @type {import('./$types').PageData} */
	//export let data;
    import amclassesdata from "../../../lib/amclassesdata.json";
    import pmclassesdata from "../../../lib/pmclassesdata.json";
    import { browser } from "$app/environment";
    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, Radio, Alert } from "flowbite-svelte";
    import { AddressBookOutline, AddressBookSolid, ArrowLeftOutline, BuildingSolid, CheckCircleSolid, ChevronLeftOutline, ComputerSpeakerSolid, MoonSolid, SunSolid, UserAddSolid, } from "flowbite-svelte-icons";
    
    function navBack() {
        if (browser) window.history.back();
    }

    let requesterSection = ""
    let classtime = ""
    let selectedClass = ""
    let selectedDate = ""
    let selectedSlot = ""
    let isChecked = false
    let isAvailable = false
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
    $: selected = selectedClass.concat(" ", selectedDate," ",selectedSlot)
    $: canRequest = (selected.length >= 20 && !(unavailable.includes(selected)))
    function checkSlot(){
        isChecked = true;
        let selected = selectedClass.concat(" ", selectedDate," ",selectedSlot);
        console.log(unavailable)
        console.log(selected)
        if (unavailable.includes(selected)) isAvailable = false;
        else isAvailable = true;
    }
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
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <Label class="space-y-2">
                            <span>Your section</span>
                            <Select class="mt-2" items={sections} bind:value={requesterSection} required/>
                        </Label>
                        <Label class="space-y-2">
                            <span>Class time to be observed</span>
                            <ul class="items-center w-full rounded-lg border border-gray-200 sm:flex dark:bg-gray-800 dark:border-gray-600 divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-600 h-min">
                                <li class="w-full"><Radio value="AM" name="classtime" class="p-3" bind:group={classtime} on:change={()=>{selectedClass = ""; selectedDate =""; selectedSlot=""}}>AM</Radio></li>
                                <li class="w-full"><Radio value="PM"name="classtime" class="p-3" bind:group={classtime} on:change={()=>{selectedClass = ""; selectedDate =""; selectedSlot=""}}>PM</Radio></li>
                              </ul>
                        </Label>
                        <Label>
                            <span>Date of Observation</span>
                            <Input type="date" bind:value={selectedDate} name="selectedDate" min={currentDate} required></Input>
                        </Label>
                        {#key classtime}
                        
                            
                            <Label class="space-y-2">
                                <span color="black">{classtime} Class</span>
                                <Select 
                                    class="mt-2"
                                    items={(classtime == "AM" ? amclassesdata : pmclassesdata)}
                                    disabled={(classtime == "")}
                                    required
                                    bind:value={selectedClass} />
                            </Label>
                            <Label class="space-y-2">
                                <span color="black">{classtime} Timeslot</span>
                                <Select
                                    class="mt-2"
                                    items={(classtime == "AM" ? amslots : pmslots)}
                                    disabled={(classtime == "")}
                                    required
                                    bind:value={selectedSlot} />
                            </Label>
                        {/key}
                        <!-- <div class = "flex flex-wrap gap-2 items-center justify-between">
                            <h6>Please check availability before requesting:</h6>
                            <Button size="sm" class="w-full justify-self-end" on:click={() => {checkSlot()}} disabled={(selectedClass.concat(" ", selectedDate," ",selectedSlot).length < 20)}>
                                <CheckCircleSolid></CheckCircleSolid>  Check </Button>
                        </div> -->
                        <div class="md:col-span-2">
                            {#if selected.length >= 20}
                                {#if canRequest}
                                    <Alert border color="green">
                                        <span class="font-medium">Slot is available.</span>
                                        You may request this slot!
                                    </Alert>
                                    {:else}
                                    <Alert border color="red">
                                        <span class="font-medium">Slot is unavailable.</span>
                                        Please try another timeslot.
                                    </Alert>
                                {/if}
                                {:else}
                                <Alert border color="yellow">
                                    <span class="font-medium">Please answer the above fields to be able to requesst.</span>
                                </Alert>
                            {/if}
                        </div>
                    </div>
                    
                    <GradientButton shadow color="green"  type="submit" disabled={!canRequest}>
                        Request
                    </GradientButton>
                </form>
            </Card>
        </TabItem>
    </Tabs>
</div>
