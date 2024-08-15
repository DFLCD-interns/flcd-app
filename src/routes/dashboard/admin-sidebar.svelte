<script>
    export let data;
    import { GridSolid } from "flowbite-svelte-icons";
    let userData = {
        firstName: data?.current_user?.first_name,
        lastName: data?.current_user?.last_name,
        userType: data?.user_access_level_label.charAt(0).toUpperCase() + data.user_access_level_label.slice(1) // first letter capitalized
    }
    let dropdownVisible = false;
</script>

<div class="h-screen flex flex-col justify-between">
    <div>
        <div class="-mx-6 px-6 py-4 flex items-center">
            <img src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png" class="h-8 px-3" alt="FLCD logo">
            <!-- <h2 class= "font-semibold text-gray-600 lg:block">System </h2>
            <h2 class= "font-semibold text-green-700 lg:block">Name</h2> -->
            <h2 class="font-bold leading-9 tracking-tight text-gray-900 lg:block">
                DFLCD
                <svg
                    class="inline align-middle h-3.5 w-auto mt-[-0.3rem]"
                    viewBox="0 0 150 35" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M5.20312 19.8438L6.82031 19.8906C7.35156 19.9062 9.05469 19.9141 11.9297 19.9141C14.8047 19.9141 16.6875 19.6797 17.5781 19.2109C18.4688 18.7422 18.9141 18.0312 18.9141 17.0781C18.9141 16.125 18.375 15.2812 17.2969 14.5469C16.2188 13.8125 15.0234 13.4453 13.7109 13.4453C11.4141 13.4453 9.52344 14.0312 8.03906 15.2031C6.55469 16.375 5.60938 17.9219 5.20312 19.8438ZM20.9297 26.6172C22.3047 26.6172 22.9922 27.2344 22.9922 28.4688C22.9922 29.0312 22.7734 29.6641 22.3359 30.3672C21.9141 31.0547 21.2891 31.6953 20.4609 32.2891C18.5234 33.6641 15.9844 34.3516 12.8438 34.3516C9.71875 34.3516 7.00781 33.2969 4.71094 31.1875C3.57031 30.1406 2.65625 28.8516 1.96875 27.3203C1.28125 25.7891 0.9375 24.1094 0.9375 22.2812C0.9375 18.7188 2.10938 15.7422 4.45312 13.3516C6.79688 10.9453 9.75 9.74219 13.3125 9.74219C16.2812 9.74219 18.6328 10.4688 20.3672 11.9219C22.1172 13.3594 22.9922 15.1328 22.9922 17.2422C22.9922 19.3516 22.1406 20.9297 20.4375 21.9766C18.7344 23.0078 15.5 23.5234 10.7344 23.5234C9.46875 23.5234 7.59375 23.4766 5.10938 23.3828C5.39062 25.8047 6.32812 27.625 7.92188 28.8438C9.51562 30.0469 11.1797 30.6484 12.9141 30.6484C14.6484 30.6484 16.0156 30.4609 17.0156 30.0859C18.0312 29.6953 18.7578 29.0234 19.1953 28.0703C19.6484 27.1016 20.2266 26.6172 20.9297 26.6172ZM29.2997 0.975999H39.6677V26.704H51.1397V34H29.2997V0.975999ZM65.0158 34.384C62.9358 34.384 60.9838 33.84 59.1598 32.752C57.3678 31.632 55.9278 30.128 54.8398 28.24C53.7518 26.32 53.2078 24.192 53.2078 21.856C53.2078 19.552 53.7518 17.472 54.8398 15.616C55.9278 13.728 57.3838 12.256 59.2078 11.2C61.0318 10.144 62.9678 9.616 65.0158 9.616C66.6798 9.616 68.2158 10.08 69.6238 11.008C71.0638 11.936 72.1518 13.328 72.8878 15.184V9.616H82.9678V34H72.8878V29.536C71.2878 32.768 68.6638 34.384 65.0158 34.384ZM68.1358 26.8C69.4158 26.8 70.5038 26.352 71.3998 25.456C72.3278 24.528 72.8238 23.44 72.8878 22.192V21.808C72.8238 20.528 72.3118 19.44 71.3518 18.544C70.4238 17.648 69.3518 17.2 68.1358 17.2C66.7918 17.2 65.6398 17.68 64.6798 18.64C63.7518 19.568 63.2878 20.688 63.2878 22C63.2878 23.344 63.7678 24.48 64.7278 25.408C65.6878 26.336 66.8238 26.8 68.1358 26.8ZM98.4377 34.384C96.3577 34.384 94.4057 33.84 92.5817 32.752C90.7897 31.632 89.3497 30.128 88.2617 28.24C87.1737 26.32 86.6297 24.192 86.6297 21.856C86.6297 19.552 87.1737 17.472 88.2617 15.616C89.3497 13.728 90.8057 12.256 92.6297 11.2C94.4537 10.144 96.3897 9.616 98.4377 9.616C100.102 9.616 101.638 10.08 103.046 11.008C104.486 11.936 105.574 13.328 106.31 15.184V9.616H116.39V34H106.31V29.536C104.71 32.768 102.086 34.384 98.4377 34.384ZM101.558 26.8C102.838 26.8 103.926 26.352 104.822 25.456C105.75 24.528 106.246 23.44 106.31 22.192V21.808C106.246 20.528 105.734 19.44 104.774 18.544C103.846 17.648 102.774 17.2 101.558 17.2C100.214 17.2 99.0617 17.68 98.1017 18.64C97.1737 19.568 96.7097 20.688 96.7097 22C96.7097 23.344 97.1897 24.48 98.1497 25.408C99.1097 26.336 100.246 26.8 101.558 26.8ZM121.252 10.288H130.9V15.184C132.756 11.472 135.7 9.616 139.732 9.616C142.804 9.616 145.204 10.72 146.932 12.928C148.692 15.104 149.572 18.128 149.572 22V34H139.492V20.992C139.492 19.616 139.188 18.56 138.58 17.824C138.004 17.088 137.188 16.72 136.132 16.72C135.364 16.72 134.612 16.976 133.876 17.488C133.14 17.968 132.532 18.672 132.052 19.6C131.604 20.528 131.38 21.584 131.38 22.768V34H121.252V10.288Z"/>
                </svg>
            </h2>
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