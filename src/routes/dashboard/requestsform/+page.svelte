<script>
    /** @type {import('./$types').PageData} */
	export let data;
    import { onMount } from 'svelte';
    import { browser } from "$app/environment";
    import { Button, Card, GradientButton, Input, Label, MultiSelect, Select, Textarea, Tabs, TabItem, } from "flowbite-svelte";
    import { AddressBookOutline, ArrowLeftOutline, BuildingSolid, ChevronLeftOutline, ComputerSpeakerSolid, UserAddSolid, } from "flowbite-svelte-icons";
    import { enhance } from '$app/forms';

    let equipmentTypes = data.equipmentTypes;
    let venues = data.venue;
    let selectedEq = [];
    let selectedVenue = "";
    let promised_start_time = "";
    let promised_end_time = "";

    let currentDateTime;
    onMount(() => {
      const now = new Date();
      currentDateTime = now.toISOString().slice(0, 16); // Get the current date and time in the correct format
    });

    let today = new Date();
    let minDate;
    today.setDate(today.getDate() + 3); // Calculate the date 3 days from today
    minDate = today.toISOString().split('T')[0]; // Format the date to `YYYY-MM-DD`

    // Add a 'value' & 'name' property to each object in the array (for Svelte each behavior)
    equipmentTypes = equipmentTypes.map((item) => ({ ...item, value: item.type, name: item.type }));

    // Function to ensure promised_end_time is always after promised_start_time
    $: promised_end_time_min = promised_start_time || currentDateTime;

    const user_access_level = data.current_user.access_level
    $: isFLCD = user_access_level == 5;
</script>

<div class="px-10 py-10">
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
                <form class="flex flex-col space-y-6" method="POST" action="?/submitEquipmentRequest" 
                use:enhance={() => {return async ({result}) => { alert(result.data?.body?.message); }}}>
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
                                <span>Quantity of {equipmentTypes.find((x) => x.value == eq).name}</span>
                                <div class="input-container">
                                  <Input 
                                    type="number" 
                                    name={eq} 
                                    min="1" 
                                    max={equipmentTypes.find((x) => x.value == eq).count} 
                                    required 
                                  />
                                  <span class="input-desc">out of {equipmentTypes.find((x) => x.value == eq).count}</span>
                                </div>
                            </Label>
                        {/each}
                    </div>
                    <hr />
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <Label class="space-y-2">
                            <span>Borrow Time</span>
                            <Input
                                type="datetime-local"
                                name="promised_start_time"
                                bind:value={promised_start_time}
                                min={currentDateTime}
                                required
                            />
                        </Label>
                        <Label class="space-y-2">
                            <span>Return Time</span>
                            <Input
                                type="datetime-local"
                                name="promised_end_time"
                                bind:value={promised_end_time}
                                min={promised_end_time_min}
                                required
                            />
                        </Label>
                        <Label class="space-y-2">
                            <span>Location of Equipment Usage</span>
                            <Input type="text" name="location" required />
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
                            <span>Email of Coordinating FLCD Teacher</span>
                            <div class="input-container">
                                <Input 
                                    disabled={!isFLCD}
                                    type="text" 
                                    name="instructor_email" 
                                    required
                                />
                                <span class="input-desc">@up.edu.ph</span>
                            </div>
                        </Label>
                        <Label class="space-y-2">
                            <span>Affiliation (for non-FLCD students)</span>
                            <Input 
                                disabled={isFLCD}
                                type="text" 
                                name="affiliation" 
                                required />
                        </Label>
                    </div>
                    <GradientButton shadow color="green" type="submit" style="margin-top: 40px; margin-bottom: 20px; padding: 13px;">
                        Submit Request
                    </GradientButton>
                </form>
            </Card>
        </TabItem>





        <TabItem>
            <span slot="title" class="flex gap-2"><BuildingSolid/>Venue</span>
            <Card class="max-w-full">
                <form class="flex flex-col space-y-6" action="?/submitVenueRequest" method="post"
                use:enhance={() => {return async ({result}) => { alert(result.data?.body?.message); }}}>
                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Reserve a Venue</h3>
                    <hr />
                    <div>
                        <Label class="space-y-2">
                            <span>Room/Area Requesting</span>
                            <Select
                              tabindex=0
                              name="selectedVenue"
                              class="mt-2"
                              bind:value={selectedVenue}
                              required
                            >
                              {#each venues as venue}
                                <option value={venue.id}>{venue.name}</option>
                              {/each}
                            </Select>
                        </Label>
                    </div>
                    <hr />
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <Label class="space-y-2">
                            <span>Purpose/Activity</span>
                            <Input type="text" name="purpose" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Use Date</span>
                            <Input type="date" name="date_needed" min={minDate} required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Activity Start Time</span>
                            <Input type="time" name="start_time" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Activity End Time</span>
                            <Input type="time" name="end_time" required />
                        </Label>
                        <Label class="space-y-2">
                            <span>Email of Coordinating FLCD Teacher</span>
                            <div class="input-container">
                                <Input 
                                    disabled={!isFLCD}
                                    type="text" 
                                    name="instructor_email" 
                                    required
                                />
                                <span class="input-desc">@up.edu.ph</span>
                            </div>
                        </Label>
                        <Label class="space-y-2">
                            <span>Affiliation (for non-FLCD students)</span>
                            <Input 
                                disabled={isFLCD}
                                type="text" 
                                name="affiliation" 
                                required />
                        </Label>
                    </div>
                    <GradientButton shadow color="green" type="submit" style="margin-top: 40px; margin-bottom: 20px; padding: 13px;">
                        Submit Request
                    </GradientButton>
                </form>
            </Card>            
        </TabItem>
    </Tabs>
</div>

<style>
    .input-container {
      position: relative;
      width: 100%;
    }
  
    .input-desc {
      position: absolute;
      right: 26px;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 5px;
      font-size: 0.9em;
      color: grey;
      pointer-events: none;
    }
  </style>
