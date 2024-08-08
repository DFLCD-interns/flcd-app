<script>
    /** @type {import('./$types').PageData} */
      export let data;
  
    import { Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton } from 'flowbite-svelte';
    import { EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid, TrashBinSolid, PlusOutline} from 'flowbite-svelte-icons';
  
    let amclasses = data.amclasses
    let pmclasses = data.pmclasses
    let unavailable = data.unavailable2
    let id = ""
    let inputSlots = [{ amorpm:'', section: '', date: '', time: ''}];
    function addRow() {
        inputSlots = [...inputSlots, { amorpm:'', section: '', date: '', time: ''}];
    }
    function deleteRow(index) {
        inputSlots = inputSlots.filter((_, i) => i !== index);
    }

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
  
    let userName;
  
    let DeleteModal=false;
    let AddModal = false;
  
  </script>
    
  <div class="p-10">
    <form class="flex gap-2 pb-5">
      <Search size="md" />
      <GradientButton color="green" class="!p-2.5">
        <SearchOutline class="w-6 h-6" />
      </GradientButton>
    </form>
    <div class="flex items-center justify-between pb-5">
        <p  class="font-semibold text-xl text-gray-700">Schedule Database</p>
        <GradientButton on:click={() => {AddModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Unavailable Slot</GradientButton>
      </div>
    <div class="pb-5">
    {#if unavailable.length != 0 }
    <Table shadow>
      <TableHead>
        <TableHeadCell></TableHeadCell>
        <TableHeadCell>date</TableHeadCell>
        <TableHeadCell>section</TableHeadCell>
        <TableHeadCell>timeslot</TableHeadCell>
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each unavailable as xslot}
        <TableBodyRow>
          <TableBodyCell>
            <button on:click={() => {DeleteModal=true; id = xslot.id}}><TrashBinOutline class="text-green-600"/></button>
          </TableBodyCell>
          <TableBodyCell>{xslot.observe_date}</TableBodyCell>
          <TableBodyCell>{xslot.name}</TableBodyCell>
          <TableBodyCell>{xslot.timeslot}</TableBodyCell>
        </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    {:else}
    <p  class="content-center text-gray-500">No users in database</p>
    {/if}
    </div>
    
  </div>
  
  <Modal title="Add Unavailable Slots" bind:open={AddModal}>
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
            <Select required name="amorpm" bind:value={row.amorpm}  on:change={(e) => {row.section = ""; row.time = ""}}>
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
  </Modal>


  <Modal title="Delete from database?" bind:open={DeleteModal}>
    <div class="flex gap-5 justify-center">
        <form method="POST" action="?/deleteRow">
        <input type="hidden" name="id" value={id} />
        <GradientButton color="green" type="submit">Confirm</GradientButton>
    </form>
    </div>
  </Modal>
  
  