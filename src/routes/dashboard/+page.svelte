<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->

<script>
    function handleClick() {
        window.location.href = "/";
    }
</script>

<aside class="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
  <div>
      <div class="-mx-6 px-6 py-4 flex items-center">
            <img src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png" class="h-8 px-3" alt="FLCD logo">
            <h2 class= "hidden font-semibold text-gray-600 lg:block">System </h2>
            <h2 class= "hidden font-semibold text-green-700 lg:block">Name</h2>
      </div>


      <div class="mt-8 text-center">
          <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
          <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
          <span class="hidden text-gray-400 lg:block">Admin</span>
      </div>

      <ul class="space-y-2 tracking-wide mt-8">
        <li>
          <a href="#" aria-label="requests" class="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path class="fill-current text-gray-600" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
              <path class="fill-current text-gray-300s" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
            </svg>
            <span class="-mr-1 text-gray-700 group-hover:text-gray-100">Requests</span>
          </a>
      </li>
          <li>
              <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path class="fill-current text-gray-300" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                      <path class="fill-current text-gray-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                  </svg>
                  <span class="group-hover:text-gray-700">Databases</span>
              </a>
          </li>
      </ul>
  </div>

  <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="group-hover:text-gray-700">Logout</span>
      </button>
  </div>
</aside>
<div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
  <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
          <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">Requests</h5>
          <button class="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>
          <div class="flex space-x-4">
              <!--search bar -->
              <div hidden class="md:block">
                  <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                      <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                      <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                          <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                      </svg>
                      </span>
                      <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition">
                  </div>
              </div>
              <!--/search bar -->
              <button aria-label="search" class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                  <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 mx-auto fill-current text-gray-600" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                  </svg>
              </button>
              <button aria-label="chat" class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
              </button>
              <button aria-label="notification" class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
              </button>
          </div>
      </div>
  </div>

  <div class="px-10 py-10">
    <div class="flex items-center justify-between pb-3">
      <a href="#" class="text-gray-700">Pending Requests</a>
      <a href="#" class="text-gray-500"> View Requests History</a>
    </div>
  
    <div class="bg-gray-200 rounded-lg shadow-lg p-6">
      <div class="mb-2">
        <h5 class="text-xl font-semibold text-gray-600">Equipment Request</h5>
        <p class="mt-2 text-gray-400">for August 24, 2024</p>
        <p class="mt-2 text-yellow-600">Pending</p>
      </div>
      <a href="#" class="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-green-600 to-lime-300 hover:from-lime-300 hover:to-green-600">
        View
      </a>
    </div>
  </div>

  

</div>