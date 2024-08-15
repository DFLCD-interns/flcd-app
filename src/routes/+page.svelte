<!-- current login page -->

<script>
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Input, Label, Button } from 'flowbite-svelte';
    import toast from 'svelte-french-toast';

    function handleClick() {
        /*--put log in logic here--*/
        goto("/dashboard", true)
    }

    /*-- password invisibility toggle logic --*/
    let passwordVisible = false;
  
    onMount(() => {
      const togglePassword = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password');
      togglePassword.addEventListener('click', () => {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? 'text' : 'password';
      });
    });

    /*-- toast logic --*/
    let loading = false

    const submitLogin = () => {
        loading = true;
        return async ({ result, update }) => {
            switch (result.type) {
                case 'success':
                    await update();
                    break;
                case 'failure':
                    // Show the actual error message from the server
                    const errorMessage = result.data.message || 'Invalid credentials';
                    toast.error(errorMessage);
                    await update();
                    break;
                case 'error':
                    toast.error(result.error.message);
                    break;
                default:
                    await update();
            }
            loading = false;
        }
    }

</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 flex rounded-xl max-w-4xl w-full drop-shadow-xl">
        <!-- Text Section -->
        <div class="sm:w-1/2 w-full p-6 flex flex-col justify-center">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <!-- <img
                    class="mx-auto h-10 w-auto"
                    src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                    alt="DFLCD"
                /> -->
                <h2 class="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to DFLCD's 
                    <svg
                        class="inline align-middle h-6 w-auto mt-[-0.45rem]"
                        viewBox="0 0 150 35" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.20312 19.8438L6.82031 19.8906C7.35156 19.9062 9.05469 19.9141 11.9297 19.9141C14.8047 19.9141 16.6875 19.6797 17.5781 19.2109C18.4688 18.7422 18.9141 18.0312 18.9141 17.0781C18.9141 16.125 18.375 15.2812 17.2969 14.5469C16.2188 13.8125 15.0234 13.4453 13.7109 13.4453C11.4141 13.4453 9.52344 14.0312 8.03906 15.2031C6.55469 16.375 5.60938 17.9219 5.20312 19.8438ZM20.9297 26.6172C22.3047 26.6172 22.9922 27.2344 22.9922 28.4688C22.9922 29.0312 22.7734 29.6641 22.3359 30.3672C21.9141 31.0547 21.2891 31.6953 20.4609 32.2891C18.5234 33.6641 15.9844 34.3516 12.8438 34.3516C9.71875 34.3516 7.00781 33.2969 4.71094 31.1875C3.57031 30.1406 2.65625 28.8516 1.96875 27.3203C1.28125 25.7891 0.9375 24.1094 0.9375 22.2812C0.9375 18.7188 2.10938 15.7422 4.45312 13.3516C6.79688 10.9453 9.75 9.74219 13.3125 9.74219C16.2812 9.74219 18.6328 10.4688 20.3672 11.9219C22.1172 13.3594 22.9922 15.1328 22.9922 17.2422C22.9922 19.3516 22.1406 20.9297 20.4375 21.9766C18.7344 23.0078 15.5 23.5234 10.7344 23.5234C9.46875 23.5234 7.59375 23.4766 5.10938 23.3828C5.39062 25.8047 6.32812 27.625 7.92188 28.8438C9.51562 30.0469 11.1797 30.6484 12.9141 30.6484C14.6484 30.6484 16.0156 30.4609 17.0156 30.0859C18.0312 29.6953 18.7578 29.0234 19.1953 28.0703C19.6484 27.1016 20.2266 26.6172 20.9297 26.6172ZM29.2997 0.975999H39.6677V26.704H51.1397V34H29.2997V0.975999ZM65.0158 34.384C62.9358 34.384 60.9838 33.84 59.1598 32.752C57.3678 31.632 55.9278 30.128 54.8398 28.24C53.7518 26.32 53.2078 24.192 53.2078 21.856C53.2078 19.552 53.7518 17.472 54.8398 15.616C55.9278 13.728 57.3838 12.256 59.2078 11.2C61.0318 10.144 62.9678 9.616 65.0158 9.616C66.6798 9.616 68.2158 10.08 69.6238 11.008C71.0638 11.936 72.1518 13.328 72.8878 15.184V9.616H82.9678V34H72.8878V29.536C71.2878 32.768 68.6638 34.384 65.0158 34.384ZM68.1358 26.8C69.4158 26.8 70.5038 26.352 71.3998 25.456C72.3278 24.528 72.8238 23.44 72.8878 22.192V21.808C72.8238 20.528 72.3118 19.44 71.3518 18.544C70.4238 17.648 69.3518 17.2 68.1358 17.2C66.7918 17.2 65.6398 17.68 64.6798 18.64C63.7518 19.568 63.2878 20.688 63.2878 22C63.2878 23.344 63.7678 24.48 64.7278 25.408C65.6878 26.336 66.8238 26.8 68.1358 26.8ZM98.4377 34.384C96.3577 34.384 94.4057 33.84 92.5817 32.752C90.7897 31.632 89.3497 30.128 88.2617 28.24C87.1737 26.32 86.6297 24.192 86.6297 21.856C86.6297 19.552 87.1737 17.472 88.2617 15.616C89.3497 13.728 90.8057 12.256 92.6297 11.2C94.4537 10.144 96.3897 9.616 98.4377 9.616C100.102 9.616 101.638 10.08 103.046 11.008C104.486 11.936 105.574 13.328 106.31 15.184V9.616H116.39V34H106.31V29.536C104.71 32.768 102.086 34.384 98.4377 34.384ZM101.558 26.8C102.838 26.8 103.926 26.352 104.822 25.456C105.75 24.528 106.246 23.44 106.31 22.192V21.808C106.246 20.528 105.734 19.44 104.774 18.544C103.846 17.648 102.774 17.2 101.558 17.2C100.214 17.2 99.0617 17.68 98.1017 18.64C97.1737 19.568 96.7097 20.688 96.7097 22C96.7097 23.344 97.1897 24.48 98.1497 25.408C99.1097 26.336 100.246 26.8 101.558 26.8ZM121.252 10.288H130.9V15.184C132.756 11.472 135.7 9.616 139.732 9.616C142.804 9.616 145.204 10.72 146.932 12.928C148.692 15.104 149.572 18.128 149.572 22V34H139.492V20.992C139.492 19.616 139.188 18.56 138.58 17.824C138.004 17.088 137.188 16.72 136.132 16.72C135.364 16.72 134.612 16.976 133.876 17.488C133.14 17.968 132.532 18.672 132.052 19.6C131.604 20.528 131.38 21.584 131.38 22.768V34H121.252V10.288Z"/>
                    </svg>
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-5" method="POST" action="?/signin" use:enhance={submitLogin}>
                    <div class="mb-5">
                        <Label for="email" class="mb-1">Email address</Label>
                        <div class="input-container">
                            <Input name="email" type="text" id="email" required disabled={loading}/>
                            <span class="input-desc">@up.edu.ph</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <Label for="password" class="mb-2">Password</Label>
                        <div class="relative">
                            <Input name="password" type="password" id="password" required disabled={loading}/>
                    
                            <!-- Eye Icon -->
                            <span id="togglePassword" class="absolute inset-y-0 flex items-center pr-3 right-0 cursor-pointer">
                                {#if passwordVisible}
                                <!-- Icon when password is visible -->
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="grey" stroke-width="1" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                                    <path stroke="grey" stroke-width="1" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>                           
                                {:else}
                                <!-- Icon when password is hidden -->
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>   
                                {/if}
                            </span>
                        </div>

                        <div class="text-right">
                            <a href="/forgot-password" class="text-sm text-gray-500 hover:text-emerald-600 underline">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" class="w-full" disabled={loading}>Login</Button>
                </form>
                <p class="mt-3 text-center text-sm text-gray-500 mb-3">
                    Don't have an account?
                    <a href="/register/student" class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">Sign Up</a>
                </p>

                <div class="mt-5 grid grid-cols-3 items-center mb-5">
                    <hr>
                    <p class="text-center text-sm text-gray-500">or
                    <hr>
                </div>
                <div>
                    <Button on:click={() => {handleClick()}} color="light" class="w-full">
                        Login as Guest
                    </Button>
                </div>
                
            </div>
        </div>

        <!-- Image Section -->
        <div class="sm:w-1/2 w-full hidden sm:block mt-6 mb-6 mr-2 ml-5">
            <img
                class="object-contain h-full w-full rounded-r-xl"
                src="/Landing Image.png"
                alt="teachers using a laptop"
            />
        </div>
    </div>
</section>






<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.gray.200");
    }

    .input-container {
      position: relative;
      width: 100%;
    }
  
    .input-desc {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 5px;
      font-size: 0.9em;
      color: grey;
      pointer-events: none;
    }
  </style>