<script>
    export let data;
    import { GridSolid } from "flowbite-svelte-icons";
    let userData = {
        firstName: data.current_user.first_name,
        lastName: data.current_user.last_name,
        userType: data.user_access_level.charAt(0).toUpperCase() + data.user_access_level.slice(1) // first letter capitalized
    }
    let dropdownVisible = false;
</script>

<div class="h-screen flex flex-col justify-between">
    <div>
        <div class="-mx-6 px-6 py-4 flex items-center">
            <img src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png" class="h-8 px-3" alt="FLCD logo">
            <h2 class= "font-semibold text-gray-600 lg:block">System </h2>
            <h2 class= "font-semibold text-green-700 lg:block">Name</h2>
        </div>


        <div class="mt-8 text-center">
            <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" class=" m-auto rounded-full object-cover w-28 h-28">
            <h5 class="mt-4 text-xl font-semibold text-gray-600 lg:block">{userData.firstName} {userData.lastName}</h5>
            <span class="text-gray-400 lg:block">{userData.userType}</span>
        </div>

        <ul class="space-y-2 tracking-wide mt-8">
            <li>
                <a href="/dashboard" aria-label="requests" class="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-300">
                <GridSolid class="text-gray-600"/>
                <span class="-mr-1 text-gray-700 group-hover:text-gray-100">Dashboard</span>
                </a>
            </li>
        <li>
            <li>
                <button on:click={() => dropdownVisible = !dropdownVisible} class="w-full px-4 py-3 flex justify-between items-center space-x-4 rounded-xl text-gray-600 group hover:bg-gradient-to-r hover:from-green-600 hover:to-lime-300">
                    <div class="gap-4 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path class="fill-current text-gray-300" fill-rule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clip-rule="evenodd" />
                            <path class="fill-current text-gray-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                        </svg>
                        <span class="group-hover:text-gray-700">Databases</span>
                    </div>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div class:hidden={!dropdownVisible} class="hidden" aria-labelledby="accordion-collapse-heading-1">
                    <ul>
                        <li>
                        <a href="/dashboard/databases/classes" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-12 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Classes</a>
                        </li>
                        <li>
                        <a href="/dashboard/databases/equipments" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-12 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Equipments</a>
                        </li>
                        <li>
                        <a href="/dashboard/databases/users" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-12 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Users</a>
                        </li>
                        <li>
                        <a href="/dashboard/databases/venues" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-12 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Venues</a>
                        </li>
                        <li>
                        <a href="/dashboard/databases/schedules" class="flex items-center w-full p-2 text-gray-600 transition duration-75 rounded-lg pl-12 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Schedules</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <div class="px-6 -mx-6 pt-2 pb-2 flex justify-between items-center border-t">
        <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <a
                href="/logout"
                class="group-hover:text-gray-700"
                ><span class="group-hover:text-gray-700">Log out</span></a
            >
        </button>
    </div>
</div>