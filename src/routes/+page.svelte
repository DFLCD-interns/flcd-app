<!-- current login page -->

<script>
    import { goto, onNavigate } from '$app/navigation';
    import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
    function handleClick() {
        /*--put log in logic here--*/
        goto("/dashboard", true)
        
    }
    async function handleSubmit(){
        /*--put log in logic here--*/
        goto(`/dashboard`)
    }
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 w-full flex rounded-xl max-w-4xl drop-shadow-xl">
        <div class="sm:w-1/2 w-full ps-3 pe-3 pb-6">
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <!--photo, header-->
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                    >
                        Sign in to your account
                    </h2>
                </div>
                <!--form-->
                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form on:submit|preventDefault={handleSubmit} class="space-y-5" action="#" method="POST">
                        <div class="mb-5">
                            <Label for="email" class="mb-2">Email address</Label>
                            <Input type="email" id="email" autocomplete="email" required />
                          </div>
                          <div class="mb-5">
                            <Label for="password" class="mb-2">Password</Label>
                            <Input type="password" id="password" required />
                          </div>
                          <Button type="submit" class="w-full">Submit</Button>
                    </form>

                    <div class="mt-5 grid grid-cols-3 items-center mb-5">
                        <hr>
                        <p class="text-center text-gray-500">or</p>
                        <hr>
                    </div>
                    <div>
                        <Button on:click={() => {handleClick()}} color="light" class="w-full"><img class="h-5 w-5 mr-2" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google"> Log in with Google</Button>
                    </div>
                    <p class="mt-5 text-center text-sm text-gray-500">
                        Don't have an account?
                        <a
                            href="/register"
                            class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                            >Register</a
                        >
                    </p>
                </div>
            </div>
        </div>
        <div class="sm:block hidden w-1/2">
            <img
                class="object-cover h-full w-full rounded-r-xl"
                src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
</style>