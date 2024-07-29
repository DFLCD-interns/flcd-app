
<script>
  import {Button, Label, Input, GradientButton, Checkbox, Dropdown, Radio, DropdownItem, Search, Modal} from 'flowbite-svelte'
  import { PlusOutline, FilterSolid, SearchOutline, ArrowLeftOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
  import { page } from '$app/stores';
  import ClassList from './class-list.svelte';
  let data;
  let form; 

  async function handleSubmit(event) {
    try {
      const formData = new FormData(event.target);
      const response = await fetch('?/register', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('User created successfully!');
      }
      else throw new Error('Failed to create user');
      // Optionally, redirect or perform another action upon success
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  }

  let AddBatchModal = false;
  let AddClassModal = false;
  let DeleteModal = false;
  let Batches = [
      { 
      batch: "'23-'24",
      classes: [
          {
          ClassName: "Class A",
          Students: [
              {
                  Name:"First Name Last Name 1", 
                  TrackingID:"TrackingID 1"
              },
              {
                  Name:"First Name Last Name 2", 
                  TrackingID:"TrackingID 2"
              }]
          },
          { 
          ClassName: "Class B",
          Students: [
              {
                  Name:"First Name Last Name 3", 
                  TrackingID:"TrackingID 3"
              },
              {
                  Name:"First Name Last Name 4", 
                  TrackingID:"TrackingID 4"
              }]
          }]
      },
      { 
      batch: "'24-'25",
      classes: [
          {
          ClassName: "Class C",
          Students: [
              {
                  Name:"First Name Last Name 5", 
                  TrackingID:"TrackingID 5"
              },
              {
                  Name:"First Name Last Name 6", 
                  TrackingID:"TrackingID 6"
              }]
          }
      ]
      }
  ]

  let CL = Batches[0].classes
  let S = CL[0].Students
  let BatchLabel = Batches[0].batch
  let ClassLabel = Batches[0].classes[0].ClassName

  function showClassList(b){
        console.log('showclasslist')
        console.log(b)
        CL = b.classes
        S = CL[0].Students
        ClassLabel = b.classes[0].ClassName
        console.log(CL)
        BatchLabel = b.batch
    }

    function showStudents(c, s){
        console.log('clicked')
        S = s
        console.log(S)
        ClassLabel=c
    }
</script>
  
<!-- <form method="POST" action="?/register" on:submit|preventDefault={handleSubmit}>
  <label>
    Batch Name:
    <input name="name" type="text" placeholder="(eg, 2023-2024 A)" required />
  </label>

  <label>
    Description:
    <input name="description" type="text" placeholder="(eg, 1st semester, began July)" size="lg" />
  </label>

  <button type="submit">Create Batch</button>
</form> -->

<div class="flex justify-between pt-10 pl-10 pr-10 bg-color-white pb-2">
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {#each Batches as Batch}
        <li class="me-2">
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" on:click={()=>showClassList(Batch)} aria-current="page" class="focus:bg-white inline-block p-4 text-gray-700 bg-gray-50 hover:bg-white rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">{Batch.batch}</button>
        </li>
        {/each}
        <li class="me-2">
            <button on:click={() => (AddBatchModal = true)} class="inline-block p-4 rounded-t-lg bg-gray-50 hover:text-gray-700 hover:bg-white dark:hover:bg-gray-800 dark:hover:text-gray-300"><PlusOutline/></button>
        </li>
    </ul>
    
</div>

<div class="flex pl-10">
    <div class="flex">
        <ul class="space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 me-2">
            {#each CL as Class}
            <li>
                <button on:click={()=>showStudents(Class.ClassName, Class.Students)} class="w-full focus:bg-green-600 focus:text-white focus:bg-green-600 focus:text-white inline-flex p-4 items-center rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    {Class.ClassName}
                </button>
            </li>
            {/each}
            <li>
                <button on:click={() => (AddClassModal = true)} class="justify-center focus:bg-green-600 focus:text-white focus:bg-green-600 focus:text-white p-4 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                    <PlusOutline/>
                </button>
            </li>
        </ul>
    </div>
    <div class="bg-white rounded-lg p-10 w-full shadow-md mr-10">
        <h1 class="font-semibold text-2xl text-gray-700 pb-5">{BatchLabel}: {ClassLabel}</h1>
        <ClassList {S}></ClassList>
    </div>
</div>

<Modal title="Add Batch" bind:open={AddBatchModal} autoclose>
    <div class="mb-6">
        <Label class="block mb-2">Batch</Label>
        <Input placeholder="Enter Batch Name" />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Description</Label>
        <Input placeholder="Enter Description" />
    </div>
    <div class="mb-6 flex gap-5 justify-center">
        <GradientButton color="green">Confirm</GradientButton>
        <GradientButton color="green">Cancel</GradientButton>
    </div>
</Modal>

<Modal title="Add Class" bind:open={AddClassModal} autoclose>
    <div class="mb-6">
        <Label class="block mb-2">Class</Label>
        <Input placeholder="Enter Class Name" />
    </div>
    <div class="mb-6">
        <Label class="block mb-2">Description</Label>
        <Input placeholder="Enter Description" />
    </div>
    <div class="mb-6 flex gap-5 justify-center">
        <GradientButton color="green">Confirm</GradientButton>
        <GradientButton color="green">Cancel</GradientButton>
    </div>
</Modal>

