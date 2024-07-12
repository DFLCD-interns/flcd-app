<script>
    import { goto, onNavigate } from "$app/navigation";
    import { Button } from "flowbite-svelte";
    function handleClick() {
        /*--put log in logic here--*/
        goto("/register/student");
    }
    
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 w-full flex rounded-xl max-w-4xl drop-shadow-xl">
        <div class="w-full ps-3 pe-3 pb-6">
            <div
                class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full"
            >
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                    >
                        Make a new account
                    </h2>
                </div>

                <div class="mt-5">
                    
                        <div class="flex flex-wrap align-center">
                            <div class="sm:w-1/2 w-full mt-3 space-y-3 sm:pr-1.5">
                                <Button size="xl" class="w-full" href="/register/student">Student</Button>
                            </div>
                            <div class="sm:w-1/2 w-full mt-3 space-y-3 sm:pl-1.5">
                                <Button size="xl" class="w-full" color="red">Teacher</Button>
                            </div>
                        </div>
                        <div class="mt-5 grid grid-cols-3 items-center mb-5">
                            <hr>
                            <p class="text-center text-gray-500">or</p>
                            <hr>
                        </div>
                        <div>
                            <Button color="light" class="w-full"><img class="h-5 w-5 mr-2" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google"> Log in with Google</Button>
                        </div>
                        <p class="mt-5 text-center text-sm text-gray-500">
                            Already have an account?
                            <a
                                href="/"
                                class="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                                >Sign in</a
                            >
                        </p>
            </div>
        </div>
    </div>
</section>

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.gray.200");
    }
</style>
