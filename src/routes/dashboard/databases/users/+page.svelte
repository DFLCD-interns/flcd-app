<script>
  /** @type {import('./$types').PageData} */
	export let data;

  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Button, Input, Modal, Label, GradientButton, MultiSelect } from 'flowbite-svelte';
  import { CheckOutline, CloseOutline, EditOutline, TrashBinOutline, FilterSolid, ChevronSortOutline } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import toast from 'svelte-french-toast';

  let users = data.user;
  let access_level = data.current_user.access_level;

  let tableHead = []
  if (users != null){
    tableHead = Object.keys(users[0]);
  }

  let userName;

  let DeleteModal=false;
  let EditModal=false;

  let editUser;
  let editingRowIndex = -1;
  let eq;

  

  function formatDate(dateString) {
    const date = new Date(dateString);
    const optionsDate = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // AM/PM format
    };

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate} at ${formattedTime}`;
  }

  users.forEach(item => {
    item.dateString = formatDate(item.created) // or use another format if preferred
  });

  let searchQuery='';
  let selectedType = [];
  let type = data.userTypes.map(item => ({
    value: item.description,
    name: item.description
  }));
  // console.log(data)

  $: users = data.user
    .filter(item => 
      selectedType.length === 0 || selectedType.includes(item.description)
    )
    .filter(item =>
      searchQuery === '' || Object.values(item).some(value =>
        // Search all string fields
        typeof value === 'string' && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

      let sortDirection = 'asc'; // Default sort direction
      let column='id';
      function handleSort(column) {
        users = users.sort((a, b) => {
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
    }

    function editRow(row) {
      editUser = {...row};
      editingRowIndex = row.id;
    }

    /*-- toast logic --*/
    let loading = false

    const deleteUser = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    DeleteModal = false;
                    toast.success("User deleted successfully!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to delete user.';
                    toast.error(errorMessage);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }
    const saveChanges = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    editingRowIndex = -1;
                    toast.success("Changes saved successfully!");
                    await update();
                    break;
                case 'failure':
                    const errorMessage = result.data.message || 'Failed to save changes.';
                    if (errorMessage === "No changes made.") {
                      editingRowIndex = -1;
                    } else {
                      toast.error(errorMessage);
                    }
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }

</script>
  
<div class="p-10">
  <div class="gap-2 w-full pb-5">
    <div class="flex gap-2 w-full items-start pb-2">
      <Search size="md" bind:value={searchQuery}/>
    </div>

    <div class="flex gap-2 pb-2  w-full">
      <span class="flex text-gray-700 gap-1 pr-1 items-center"><FilterSolid/>Filter:</span>
      <MultiSelect class="w-full bg-white text-gray-400 text-sm" placeholder="select admin type" items={type} bind:value={selectedType} />
    </div>
    <hr>
  </div>
  <div class="flex items-center justify-between pb-5">
    <p  class="font-semibold text-xl text-gray-700">Users Database</p>
  </div>
  <div class="pb-5">
  {#if users != null }
  <Table shadow>
    <TableHead>
      {#each tableHead as head}
      {#if head != 'dateString'}
      <TableHeadCell>
        <button type='button' class="flex cursor-pointer" on:click={() => handleSort(head)}>
          {head}
          <ChevronSortOutline size='sm'/>
        </button>
      </TableHeadCell>
      {/if}
      {/each}
    <TableHeadCell>
    </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each users as user}
      <TableBodyRow>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
              <Input type="text" bind:value={editUser.id} />  
            {:else}
            {user.id}
          {/if}
          </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.first_name} />
          {:else}
            {user.first_name}
          {/if}
          </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.last_name} />
          {:else}
            {user.last_name}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.email} />
          {:else}
            {user.email}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.phone} />
          {:else}
            {user.phone}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.student_number} />
          {:else}
            {user.student_number}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.course} />
          {:else}
            {user.course}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.department} />
          {:else}
            {user.department}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <Input type="text" bind:value={editUser.access_level} />
          {:else}
            {user?.access_level}
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          {user.description}
        </TableBodyCell>
        <TableBodyCell>
          {formatDate(user.created)}
        </TableBodyCell>

        <TableBodyCell>
          {#if editingRowIndex === user.id}
            <form method="POST" action="?/editUser" use:enhance={saveChanges}>
              <input type="hidden" name="id" value={editUser.id}/>
              <input type="hidden" name="first_name" value={editUser.first_name}/> <input type="hidden" name="old_first_name" value={user.first_name}/>
              <input type="hidden" name="last_name" value={editUser.last_name}/> <input type="hidden" name="old_last_name" value={user.last_name}/>
              <input type="hidden" name="email" value={editUser.email}/> <input type="hidden" name="old_email" value={user.email}/>
              <input type="hidden" name="phone" value={editUser.phone}/> <input type="hidden" name="old_phone" value={user.phone}/>
              <input type="hidden" name="student_number" value={editUser.student_number}/> <input type="hidden" name="old_student_number" value={user.student_number}/>
              <input type="hidden" name="course" value={editUser.course}/> <input type="hidden" name="old_course" value={user.course}/>
              <input type="hidden" name="department" value={editUser.department}/> <input type="hidden" name="old_department" value={user.department}/>
              <input type="hidden" name="access_level" value={editUser.access_level}/> <input type="hidden" name="old_access_level" value={user.access_level}/>
              <button type="submit" disabled={loading} class="mr-2"><CheckOutline class="text-green-600 mr-2"/></button>
              <button on:click={() => {editingRowIndex = -1}} disabled={loading}><CloseOutline class="text-red-600"/></button>
            </form>
          {:else}
            <button on:click={() => editRow(user)}><EditOutline class="text-green-700 mr-2"/></button>
            <button on:click={() => {DeleteModal = true; eq = user}}><TrashBinOutline class="text-red-700"/></button>
          {/if}
        </TableBodyCell>

      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  {:else}
  <p  class="content-center text-gray-500">No blocked slots yet</p>
  {/if}
  </div>
  
</div>

<Modal size="xs" bind:open={DeleteModal} outsideclose>
  <div class="text-center">
    <h3 class="mb-1 text-lg font-bold text-gray-800 dark:text-gray-400">Delete equipment from database?</h3>
    <p class="mb-6 text-sm">You are about to delete this entry. This cannot be undone.</p>
    <p class="text-gray-800">First name: <span style="font-weight: 600;">{eq.first_name}</span></p>
    <p class="text-gray-800">Last name: <span style="font-weight: 600;">{eq.last_name}</span></p>
    <p class="text-gray-800">Email: <span style="font-weight: 600;">{eq.email}</span></p>
    <p class="text-gray-800">Phone: <span style="font-weight: 600;">{eq.phone}</span></p>
    <p class="text-gray-800">Student number: <span style="font-weight: 600;">{eq.student_number}</span></p>
    <p class="text-gray-800">Course: <span style="font-weight: 600;">{eq.course}</span></p>
    <p class="text-gray-800">Department: <span style="font-weight: 600;">{eq.department}</span></p>
    <p class="text-gray-800">Access level: <span style="font-weight: 600;">{eq.access_level}</span></p>
    <p class="mb-6 text-gray-800">Description: <span style="font-weight: 600;">{eq.description}</span></p>
    <form method="POST" action="?/deleteUser" use:enhance={deleteUser}>
      <input type="hidden" name="id" value={eq.id}/>
      <div class="flex mb-1 gap-1 justify-center">
        <Button type="submit" disabled={loading} color="red" class="me-2"><TrashBinOutline class="text-white mr-1"/>Delete</Button>
        <Button color="alternative" disabled={loading} on:click={() => DeleteModal = false}>Cancel</Button>
      </div>
    </form>
  </div>
</Modal>

<Modal title="Edit User Details" bind:open={EditModal} autoclose>
  {console.log(editUser)}
  <div class="mb-6">
      <Label class="block mb-2">First Name</Label>
      <Input value={editUser.first_name} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Last Name</Label>
    <Input value={editUser.last_name} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Email</Label>
    <Input value={editUser.email} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Phone</Label>
    <Input value={editUser.phone} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Student Number</Label>
    <Input value={editUser.student_number} disabled=true/>
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Course</Label>
    <Input value={editUser.course} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Department</Label>
    <Input value={editUser.department} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Access Level</Label>
    <Input value={editUser.access_level}/>
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Access Level Description</Label>
    <Input value={editUser.description} />
  </div>
  <div class="mb-6">
    <Label class="block mb-2">Date Created</Label>
    <Input name="schedule" type="text" value={editUser.created} onfocus="(this.type='date')" onblur="(this.type='text')"/>
  </div>
  <div class="mb-6 flex gap-5 justify-center">
      <GradientButton color="green">Confirm</GradientButton>
      <GradientButton color="green">Cancel</GradientButton>
  </div>
</Modal>

