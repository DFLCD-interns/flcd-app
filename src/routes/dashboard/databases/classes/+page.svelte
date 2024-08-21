<script>
    /** @type {import('./$types').PageData} */
      export let data;
  
    import { Select, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton, Dropdown, DropdownItem, MultiSelect } from 'flowbite-svelte';
    import { DownloadSolid, EditOutline, TrashBinOutline, SearchOutline, CirclePlusSolid, AngleDownOutline, ChevronSortOutline, FilterSolid, UndoOutline, RectangleListSolid } from 'flowbite-svelte-icons';
    import { downloadCSV } from '../downloadcsv';
    import BatchTable from './batchTable.svelte';
    import ClassTable from './classTable.svelte';
    import toast from 'svelte-french-toast';
    import { enhance } from '$app/forms';

    // console.log("v:", data.classes_only_table)
    let access_level=data.current_user.access_level;
  
    let batches = data.batches;
    let tableHead = []
    if (batches[0] != null){
      tableHead = Object.keys(batches[0]);
    }
  
    let EditBatchModal = false;
    let EditClassModal = false;
    let DeleteModal=false;
    let AddBatchModal = false;
    let AddClassModal = false;
    let EditChildModal = false;
    let AddChildModal = false;
  
    let editBatch = data.batches_only_table[0];
    let editClass = data.classes_only_table[0];
    let editChild = batches[0];

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get individual date components
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

        // Get time components
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Format date and time according to the desired format
        return `${month}/${day}/${year}  ${hours}:${minutes}`;
    }

    let searchQuery='';
    let selectedBatch = [];
    let sBatch = data.batches_only_table.map(item => ({
        value: item.id,
        name: item.name
    }));

    let selectedClass = [];
    let sClass=[];

    let selectedView = '';
    let sView = [{value:'batches', name:'batches'},{value:'classes', name:'classes'},{value:'children', name:'children'}]

    let showBatchOnly = false;
    let showClassOnly = false;

    let sortedBatches = data.batches;


    

    $: {
        
        sClass = data.classes_only_table.filter(classItem => {
            return selectedBatch.some(batch => batch === classItem.batch_id);
        });

        sClass = sClass.map(item => ({
            value: item.id,
            name: item.name
        }));

        if (selectedView === 'batches'){
            showBatchOnly=true
            showClassOnly=false
        } else if (selectedView === 'classes'){
            showClassOnly=true
            showBatchOnly=false
        } else {
            showClassOnly=false
            showBatchOnly=false
        }

        
        if (showBatchOnly) {
            batches = data.batches_only_table;
        } else if (showClassOnly){
            batches = data.classes_batch_table
            .filter(item => 
            selectedBatch.length === 0 || selectedBatch.includes(item.batch_id)
            )
            
            if (selectedBatch.length === 0) {
                batches =  data.classes_batch_table;
            }

        } else {
            // console.log('in here')
            batches = batches
            .filter(item => 
            selectedBatch.length === 0 || selectedBatch.includes(item.batch_id)
            )
            .filter(item => 
            selectedClass.length === 0 || selectedClass.includes(item.class_id)
            )
            
            if (selectedBatch.length === 0 ) {
                batches = sortedBatches;
            }

            if (selectedClass.length === 0) {
                batches = sortedBatches
                .filter(item => 
                selectedBatch.length === 0 || selectedBatch.includes(item.batch_id)
            )

        }}
        
        batches = batches.filter(item =>
        searchQuery === '' || Object.values(item).some(value =>
            // Search all string fields
            typeof value === 'string' && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
        );}

    
        
        let sortDirection = 'asc'; // Default sort direction
        let column='id';
        function handleSort(column) {
            sortedBatches = batches.sort((a, b) => {
            let aValue = a[column];
            let bValue = b[column];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
            // Sort strings alphabetically
            if (sortDirection === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
            } else if (column === 'dateString'){
            if (sortDirection === 'asc') {
                return a[date_created] - b[date_created];
            } else {
                return b[date_created] - a[date_created];
            }
            } else {
            // Sort numbers numerically
            if (sortDirection === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }}
        });
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        // console.log(batches)
        }

    /*-- toast logic --*/
    let loading = false

    const submitBatch = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success("Batch successfully added!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to add batch.';
                    toast.error(errorMessage);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }

    const submitClass = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    toast.success("Class successfully added!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to add class.';
                    toast.error(errorMessage);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }
    
    console.log(data)

  </script>
    
  <div class="p-10">
    <div class="gap-2 w-full pb-5">
        <div class="flex gap-2 w-full items-start pb-2">
          <Search size="md" bind:value={searchQuery}/>
        </div>
    
        <div class="flex gap-2 pb-2  w-full">
            <span class="flex text-gray-700 gap-1 pr-1 items-center"><RectangleListSolid/>View:</span>
            
            <Select class="w-full bg-white text-gray-400 text-sm" placeholder="select view option" items={sView} bind:value={selectedView} />
        
            {#if showBatchOnly == true}
            <!-- <div class="w-full"></div>
            <Button class='w-[30%] flex gap-1 ' on:click={() => {showBatchOnly=false}}><UndoOutline/>Show batches, classes and children</Button>-->
            {:else if showClassOnly == true}
            <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
            <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select batch" items={sBatch} bind:value={selectedBatch} />
            {:else}
            <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
            <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select batch" items={sBatch} bind:value={selectedBatch} />
            <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select class" items={sClass} bind:value={selectedClass} />          
            {/if}
        </div>
        <hr>
      </div>
    <div class="flex items-center justify-between pb-5">
      <p  class="font-semibold text-xl text-gray-700">Classes Database</p>
      <div class = "flex gap-2">
        {#if access_level != 4}
        <GradientButton on:click={() => {AddBatchModal=true}}  color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Batch</GradientButton>
        <GradientButton on:click={() => {AddClassModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Class</GradientButton>
        <GradientButton on:click={() => {AddChildModal=true}} color="green" class="inline-flex text-center gap-2"><CirclePlusSolid/>Add Child</GradientButton>
        {/if}
        <GradientButton on:click={() => {downloadCSV(batches, 'all_classes')}} color="green" class="inline-flex text-center gap-2"><DownloadSolid/>Download Table</GradientButton>
        </div>
    </div>
    <div class="pb-5">
    {#if batches != null && (showBatchOnly == false && showClassOnly == false)}
    <Table shadow>
      <TableHead>
        {#each tableHead as head}
        {#if head != 'batch_id' && head != 'class_id'}
            <TableHeadCell>
            <button type='button' class="flex cursor-pointer" on:click={() => handleSort(head)}>
              {head}
              <ChevronSortOutline size='sm'/>
            </button>
          </TableHeadCell>
          {/if}
        {/each}
        {#if access_level != 4}
        <TableHeadCell></TableHeadCell>
        {/if}
      </TableHead>
      <TableBody tableBodyClass="divide-y">
        {#each batches as batch}
        <TableBodyRow>
          <TableBodyCell>{batch.batch_name}</TableBodyCell>
          <TableBodyCell>{batch.class_name}</TableBodyCell>
          <TableBodyCell>{batch.handler_firstname}</TableBodyCell>
          <TableBodyCell>{batch.handler_lastname}</TableBodyCell>
          <TableBodyCell>{batch.schedule}</TableBodyCell>
          <TableBodyCell>{batch.child_name}</TableBodyCell>
          <TableBodyCell>{formatDate(batch.child_birthdate)}</TableBodyCell>
          <TableBodyCell>{batch.child_trackingid}</TableBodyCell>
          <TableBodyCell>{formatDate(batch.child_created)}</TableBodyCell>
          {#if access_level != 4}
          <TableBodyCell>
            <button on:click={() => {EditChildModal = true; editChild = batch}}><EditOutline class="text-green-700 mr-2"/></button>
            <button on:click={() => {DeleteModal = true}}><TrashBinOutline class="text-red-700"/></button>
          </TableBodyCell>
          {/if}
        </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    {:else if showBatchOnly==true}
    <BatchTable batches={batches} access_level={access_level}/>
    {:else if showClassOnly==true}
    <ClassTable classes={batches} access_level={access_level}/>
    {:else}
    <p  class="content-center text-gray-500">No classes in database</p>
    {/if}
    </div>
    
  </div>
  
  <Modal title="Edit or Delete Batch" bind:open={EditBatchModal} autoclose>
    
        <div class="mb-6 ">
            <Label for="batch" class="block mb-2 font-bold">Select a batch</Label>
            <select bind:value={editBatch} id="batch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {#each data.batches_only_table as b}
            <option value={b}>{b.name}</option>
            {/each}
            </select>
        </div>
        <hr>
        <form>
        <div class="mb-6">
            <div class="flex justify-between items-end">
                <Label class="block mb-2">Batch Name</Label>
                <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"><TrashBinOutline class="w-4 h-4"/></button>
            </div>
            <Input name="name" type="text" value={editBatch.name} required />
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Description</Label>
            <Input name="description" type="text" value={editBatch.description} />
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Date Created</Label>
            <Input name="description" type="text" value={editBatch.created} onfocus="(this.type='date')" onblur="(this.type='text')"/>
        </div>
        <div class="mb-6 flex gap-2 justify-center">
            <GradientButton color="green">Confirm</GradientButton>
            <GradientButton on:click={() => {EditBatchModal = false}} color="green">Cancel</GradientButton>
        </div>
    </form>
  </Modal>

  <Modal title="Edit or Delete Class" bind:open={EditClassModal} autoclose>
    <div class="mb-6">
        <Label for="class" class="block mb-2 font-bold">Select a class</Label>
        <select bind:value={editClass} id="class" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {#each data.classes_only_table as c}
        <option value={c}>{c.name}</option>
        {/each}
    </div>
    <hr>
    <form>
        <div class="mb-6">
            <div class="flex justify-between items-end">
                <Label class="block mb-2">Class Name</Label>
                <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"><TrashBinOutline class="w-4 h-4"/></button>
            </div>
            <Input name="name" type="text" value={editClass.name} required />
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Handler ID</Label>
            <Input name="handler_id" type="number" value={editClass.handler_id}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Batch ID</Label>
            <Input name="batch_id" type="number" value={editClass.batch_id}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Description</Label>
            <Input name="description" type="text" value={editClass.description}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Schedule</Label>
            <Input name="schedule" type="text" value={editClass.schedule}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Date Created</Label>
            <Input name="description" type="text" value={editClass.created} onfocus="(this.type='date')" onblur="(this.type='text')"/>
        </div>
        <div class="mb-6 flex gap-2 justify-center">
            <GradientButton type="submit" class="button-style" color="green">Confirm</GradientButton>
            <GradientButton  on:click={() => {EditClassModal = false}} color="green">Cancel</GradientButton>
        </div>
    </form>
  </Modal>
  
  <Modal title="Add Batch" bind:open={AddBatchModal} >
    <form action="?/createBatch" method="POST" use:enhance={submitBatch}>
        <div class="mb-6">
            <Label class="block mb-2">Batch Name</Label>
            <Input name="name" type="text" placeholder="Enter batch name (eg, 2023-2024 A)." required />
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Description</Label>
            <Input name="description" type="text" placeholder="Enter description (eg, 1st semester, began July)." />
        </div>
        <div class="flex gap-5 justify-center">
            <Button type="submit" class="w-full" disabled={loading}>Confirm</Button>
            <Button 
              type="button" 
              class="bg-red-700 hover:bg-red-800" 
              disabled={loading} 
              on:click={() => AddBatchModal = false}
            >
              Cancel
            </Button>
          </div>
      </form>
  </Modal>

  <Modal title="Add Class" bind:open={AddClassModal}>
    <form action="?/createClass" method="POST" use:enhance={submitClass}>
        <div class="mb-6">
            <Label class="block mb-2">Class Name</Label>
            <Input name="name" type="text" placeholder="Enter class name(eg, String Theory 101 - Section 1)." required/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Handler ID</Label>
            <Select items name="handler_id" type="number" placeholder="Select handler ID (eg, 12)" required/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Batch ID</Label>
            <Input name="batch_id" type="number" placeholder="(eg, 4)" required/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Description</Label>
            <Input name="description" type="text" placeholder="(eg, Section 1)"/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Schedule</Label>
            <Input name="schedule" type="text" placeholder="" required/>
        </div>
        <div class="flex gap-5 justify-center">
            <Button type="submit" class="w-full" disabled={loading}>Confirm</Button>
            <Button 
              type="button" 
              class="bg-red-700 hover:bg-red-800" 
              disabled={loading} 
              on:click={() => AddModal = false}
            >
              Cancel
            </Button>
          </div>
      </form>
  </Modal>

  <Modal title="Edit Child Details" bind:open={EditChildModal} autoclose>
    <form >
        <div class="mb-6">
            <Label class="block mb-2">Batch Name</Label>
            <Input disabled=true type="text" value={editChild.batch_name} required />
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Class Name</Label>
            <Input disabled=true type="text" value={editChild.class_name}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Handler</Label>
            <Input disabled=true type="text" value={editChild.handler_firstname+" "+editChild.handler_lastname}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Child Name</Label>
            <Input type="text" value={editChild.child_name}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Child Birthdate</Label>
            <Input name="description" type="text" value={formatDate(editChild.child_birthdate)} onfocus="(this.type='date')" onblur="(this.type='text')"/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Child Tracking ID</Label>
            <Input name="schedule" type="text" value={editChild.child_trackingid}/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Date Created</Label>
            <Input name="schedule" type="text" value={formatDate(editChild.child_created)} onfocus="(this.type='date')" onblur="(this.type='text')"/>
        </div>
        <div class="mb-6 flex gap-2 justify-center">
            <GradientButton type="submit" class="button-style" color="green">Confirm</GradientButton>
            <GradientButton  on:click={() => {EditClassModal = false}} color="green">Cancel</GradientButton>
        </div>
    </form>
  </Modal>

  <Modal title="Add Child" bind:open={AddChildModal}>
    <form action="?/addChild" method="POST">
        <div class="mb-6">
            <Label class="block mb-2">Name</Label>
            <Input name="name" type="text" placeholder="Child Name" required/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Birthdate</Label>
            <Input name="birthdate" type="date" placeholder="Child Birthdate"/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Tracking ID</Label>
            <Input name="tracking_id" type="number" placeholder="Child Tracking ID"/>
        </div>
        <div class="mb-6">
            <Label class="block mb-2">Class ID</Label>
            <Input name="class_id" type="text" placeholder="Class ID"/>
        </div>
        <div class="mb-6 flex gap-2 justify-center">
            <GradientButton type="submit" class="button-style" color="green">Confirm</GradientButton>
            <GradientButton  on:click={() => {AddClassModal = false}} color="green">Cancel</GradientButton>
        </div>
      </form>
  </Modal>

  <Modal title="Delete this row from database?" bind:open={DeleteModal} autoclose>
    <div class="flex gap-5 justify-center">
        <GradientButton color="green">Confirm</GradientButton>
        <GradientButton color="green">Cancel</GradientButton>
    </div>
  </Modal>
    