<script>
    import { Select, Input, Button, MultiSelect, Label } from "flowbite-svelte";
    import { PlusOutline, TrashBinSolid } from "flowbite-svelte-icons";
    export let data;
    let amclasses = data.amclasses
    let pmclasses = data.pmclasses
    let unavailable = data.unavailable2
    let inputSlots = [{ amorpm:'', section: '', date: '', time: ''}];
    function addRow() {
        inputSlots = [...inputSlots, { amorpm:'', section: '', date: '', time: ''}];
    }
    function deleteRow(index) {
        inputSlots = inputSlots.filter((_, i) => i !== index);
    }
    let time = ""
    let date = ""
    let amorpm = ""
    let section = ""
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
</script>

<h5>View/delete unavailable slots</h5>
<ul>
    {#each unavailable as xslot}
        <li class="mb-2"> {xslot.observe_date} {xslot.name} {xslot.timeslot}
            <form method="POST" action="?/deleteRow">
                <div class="flex">
                <input type="hidden" name="id" value={xslot.id} />
                <Button outline color ="red" type="submit" class="w-2"> <TrashBinSolid class="sm"/></Button>
            </div>
              </form>
        </li>
    {/each}
</ul>
<h5> Add unavailable slots</h5>
<div class="p-3">
    <form method="POST" action="?/addUnavailableSlots">
        <div>
            
            {#each inputSlots as row, index}
            <div class="flex justify-end">
                <Button class="block !p-2 mb-2 align-self-end" color="red" size="sm" outline on:click={() => deleteRow(index)}><TrashBinSolid/></Button>
            </div>
            <div class="grid sm:grid-cols-2 gap-2">
                <Label class="space-y-2">
                    <span>Date of Observation</span>
                        <Input required name="date" type="date" bind:value={row.date}/>
                </Label>
                <Label class="space-y-2">
                    <span>Time of Day</span>
            <Select required name="amorpm" bind:value={row.amorpm}  on:change={(e) => {section = ""; time = ""}}>
                <option>AM</option>
                <option>PM</option>
            </Select>
            </Label>
            <Label class="space-y-2">
                <span>Section</span>
            <Select required name="section" disabled = {row.amorpm == ""} bind:value={row.section}>
                {#each ((row.amorpm == "AM") ? amclasses : pmclasses) as section}
                    <option value={section.id}> {section.name}</option>
                {/each}
            </Select>
            </Label>
            <Label class="space-y-2">
                <span>Timeslot</span>
            <Select required name="timeslot" disabled = {row.amorpm == ""} items = {((row.amorpm == "AM") ? amslots : pmslots)} bind:value={row.time}></Select>
            </Label>
        </div>
            {/each}
        </div>
        <Button on:click={addRow} color="alternative"><PlusOutline></PlusOutline>Add Slots</Button>
        <Button type="submit">Make Unavailable</Button>
    
</form>

</div>
<p>
    <ul>
        {#each inputSlots as slot}<li>{slot.section} {slot.date} {slot.time}</li>{/each}
    </ul>