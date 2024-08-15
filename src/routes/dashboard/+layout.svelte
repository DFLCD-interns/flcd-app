<script>
    export let data;
    import { Card, Button, Drawer, CloseButton } from 'flowbite-svelte';
    import { ArrowRightOutline, InfoCircleSolid, HomeSolid } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    // import admminSidebar from './admin-sidebar.svelte';
    import AdminSidebar from './admin-sidebar.svelte';
    import NonAdminSidebar from './non-admin-sidebar.svelte';
    let hidden1 = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    function handleClick() {
        window.location.href = "/";
    }
    let isAdmin = (data?.current_user?.access_level < 5);
</script>
<aside class="hidden lg:block fixed z-10 top-0 pb-3 px-6 w-full justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    {#if isAdmin}
        <AdminSidebar {data}></AdminSidebar>
    {:else} 
        <NonAdminSidebar {data}></NonAdminSidebar>
    {/if}
</aside>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1" class="justify-between">
    {#if isAdmin}
        <AdminSidebar {data}></AdminSidebar>
    {:else} 
        <NonAdminSidebar {data}></NonAdminSidebar>
    {/if}
</Drawer>

<!--navbar-->
<div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
  <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5 lg:hidden">
      <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
          <!-- <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5> -->
          <!--hamburger-->
          <button on:click={() => (hidden1 = false)} class="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>
          <!-- <div class="flex space-x-4"> -->
              <!--search bar -->
              <!-- <div hidden class="md:block">
                  <div  hidden class="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                      <span hidden class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                      <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                          <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                      </svg>
                      </span>
                      <input disabled type="search" name="leadingIcon" id="leadingIcon" class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition">
                  </div>
              </div> -->
              <!--/search bar -->
          <!-- </div> -->
      </div>
  </div>

  <!--actual dashboard-->
  <slot></slot>

</div>