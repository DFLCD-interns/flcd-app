<script>
    function handleClick() {
        /*--put log in logic here--*/
        window.location.href = "/dashboard";
        
    }
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-3">
    <div class="bg-gray-100 flex rounded-xl max-w-3xl drop-shadow-xl">
        <div class="sm:w-1/2 ps-3 pe-3 pb-6">
            <div
                class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
            >
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
                    >
                        Sign in to your account
                    </h2>
                </div>

                <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form class="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                for="email"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >Email address</label
                            >
                            <div class="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    required
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div class="flex items-center justify-between">
                                <label
                                    for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >Password</label
                                >
                                <div class="text-sm">
                                    <a
                                        href="#"
                                        class="font-semibold text-emerald-600 hover:text-emerald-500"
                                        >Forgot password?</a
                                    >
                                </div>
                            </div>
                            <div class="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <button
                            on:click={() => {handleClick()}}
                                type="submit"
                                class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                >Sign in</button
                            >
                        </div>
                    </form>

                    <div class="mt-5 grid grid-cols-3 items-center">
                        <hr>
                        <p class="text-center text-gray-500">or</p>
                        <hr>
                    </div>
                    <div>
                        <button
                            on:click={() => {handleClick()}}
                            type="submit"
                            class="items-center mt-6 flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-600 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 border-2 border-gray-300"
                            > <img class="h-5 w-5 mr-2" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google"> Log in with Google</button
                        >
                    </div>
                    <p class="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?
                        <a
                            href="/dashboard"
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
        background-color: theme("colors.gray.100");
    }
</style>