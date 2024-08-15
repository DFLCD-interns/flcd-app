<script>
    import { enhance } from '$app/forms';
    import { browser } from "$app/environment";
    import { Input, Label, Button, Select, Alert } from "flowbite-svelte";
    import { ArrowLeftOutline } from "flowbite-svelte-icons";
    import toast from 'svelte-french-toast';

    let selectedDept = "";
    let password, confirm_password;

    /*-- toast logic --*/
    let loading = false

    const submitRegister = () => {
    loading = true;

    return async ({ result, update }) => {
        switch (result.type) {
            case 'success':
                await update();
                break;
            case 'failure':
                const errorMessage = result.data.message || 'Failed to create user';
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
    };
};
    
    // $: isOther = selectedDept == "other";
    let depts = [
        { value: "DCTID", name: "Department of Clothing, Textiles, and Interior Design" },
        { value: "DFLCD", name: "Department of Family Life and Child Development" },
        { value: "DFSN", name: "Department of Food Science and Nutrition" },
        { value: "DHeEd", name: "Department of Home Economics Education" },
        { value: "DHRIM", name: "Department of Hotel, Restaurant, and Institution Management" },
        { value: "other", name: "Other..." },
    ];
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 w-full flex rounded-xl max-w-4xl drop-shadow-xl">
        <div class="w-full ps-3 pe-3 pb-6">
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full" >
                <div class="sm:w-full sm:mx-auto w-full relative">
                    <Button
                        color="alternative"
                        class="!p-2 absolute top-0 left-0"
                        href="/">
                        <ArrowLeftOutline class="w-6 h-6" />
                    </Button>
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" >
                        Make a new 
                        <svg
                            class="inline align-middle h-5 w-auto mt-[-0.4rem] ml-0.5 mr-0.5"
                            viewBox="0 0 150 35" 
                            fill="currentColor" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5.20312 19.8438L6.82031 19.8906C7.35156 19.9062 9.05469 19.9141 11.9297 19.9141C14.8047 19.9141 16.6875 19.6797 17.5781 19.2109C18.4688 18.7422 18.9141 18.0312 18.9141 17.0781C18.9141 16.125 18.375 15.2812 17.2969 14.5469C16.2188 13.8125 15.0234 13.4453 13.7109 13.4453C11.4141 13.4453 9.52344 14.0312 8.03906 15.2031C6.55469 16.375 5.60938 17.9219 5.20312 19.8438ZM20.9297 26.6172C22.3047 26.6172 22.9922 27.2344 22.9922 28.4688C22.9922 29.0312 22.7734 29.6641 22.3359 30.3672C21.9141 31.0547 21.2891 31.6953 20.4609 32.2891C18.5234 33.6641 15.9844 34.3516 12.8438 34.3516C9.71875 34.3516 7.00781 33.2969 4.71094 31.1875C3.57031 30.1406 2.65625 28.8516 1.96875 27.3203C1.28125 25.7891 0.9375 24.1094 0.9375 22.2812C0.9375 18.7188 2.10938 15.7422 4.45312 13.3516C6.79688 10.9453 9.75 9.74219 13.3125 9.74219C16.2812 9.74219 18.6328 10.4688 20.3672 11.9219C22.1172 13.3594 22.9922 15.1328 22.9922 17.2422C22.9922 19.3516 22.1406 20.9297 20.4375 21.9766C18.7344 23.0078 15.5 23.5234 10.7344 23.5234C9.46875 23.5234 7.59375 23.4766 5.10938 23.3828C5.39062 25.8047 6.32812 27.625 7.92188 28.8438C9.51562 30.0469 11.1797 30.6484 12.9141 30.6484C14.6484 30.6484 16.0156 30.4609 17.0156 30.0859C18.0312 29.6953 18.7578 29.0234 19.1953 28.0703C19.6484 27.1016 20.2266 26.6172 20.9297 26.6172ZM29.2997 0.975999H39.6677V26.704H51.1397V34H29.2997V0.975999ZM65.0158 34.384C62.9358 34.384 60.9838 33.84 59.1598 32.752C57.3678 31.632 55.9278 30.128 54.8398 28.24C53.7518 26.32 53.2078 24.192 53.2078 21.856C53.2078 19.552 53.7518 17.472 54.8398 15.616C55.9278 13.728 57.3838 12.256 59.2078 11.2C61.0318 10.144 62.9678 9.616 65.0158 9.616C66.6798 9.616 68.2158 10.08 69.6238 11.008C71.0638 11.936 72.1518 13.328 72.8878 15.184V9.616H82.9678V34H72.8878V29.536C71.2878 32.768 68.6638 34.384 65.0158 34.384ZM68.1358 26.8C69.4158 26.8 70.5038 26.352 71.3998 25.456C72.3278 24.528 72.8238 23.44 72.8878 22.192V21.808C72.8238 20.528 72.3118 19.44 71.3518 18.544C70.4238 17.648 69.3518 17.2 68.1358 17.2C66.7918 17.2 65.6398 17.68 64.6798 18.64C63.7518 19.568 63.2878 20.688 63.2878 22C63.2878 23.344 63.7678 24.48 64.7278 25.408C65.6878 26.336 66.8238 26.8 68.1358 26.8ZM98.4377 34.384C96.3577 34.384 94.4057 33.84 92.5817 32.752C90.7897 31.632 89.3497 30.128 88.2617 28.24C87.1737 26.32 86.6297 24.192 86.6297 21.856C86.6297 19.552 87.1737 17.472 88.2617 15.616C89.3497 13.728 90.8057 12.256 92.6297 11.2C94.4537 10.144 96.3897 9.616 98.4377 9.616C100.102 9.616 101.638 10.08 103.046 11.008C104.486 11.936 105.574 13.328 106.31 15.184V9.616H116.39V34H106.31V29.536C104.71 32.768 102.086 34.384 98.4377 34.384ZM101.558 26.8C102.838 26.8 103.926 26.352 104.822 25.456C105.75 24.528 106.246 23.44 106.31 22.192V21.808C106.246 20.528 105.734 19.44 104.774 18.544C103.846 17.648 102.774 17.2 101.558 17.2C100.214 17.2 99.0617 17.68 98.1017 18.64C97.1737 19.568 96.7097 20.688 96.7097 22C96.7097 23.344 97.1897 24.48 98.1497 25.408C99.1097 26.336 100.246 26.8 101.558 26.8ZM121.252 10.288H130.9V15.184C132.756 11.472 135.7 9.616 139.732 9.616C142.804 9.616 145.204 10.72 146.932 12.928C148.692 15.104 149.572 18.128 149.572 22V34H139.492V20.992C139.492 19.616 139.188 18.56 138.58 17.824C138.004 17.088 137.188 16.72 136.132 16.72C135.364 16.72 134.612 16.976 133.876 17.488C133.14 17.968 132.532 18.672 132.052 19.6C131.604 20.528 131.38 21.584 131.38 22.768V34H121.252V10.288Z"/>
                        </svg>
                        account
                    </h2>
                </div>

                <div class="mt-5">
                    <form class="space-y-3" method="POST" action="?/register" use:enhance={submitRegister}>
                        <div class="flex flex-wrap align-center">
                            <div class="sm:w-1/2 w-full mt-3 space-y-4 sm:pr-1.5">
                                <div class="flex items-center space-x-2">
                                    <div>
                                        <Label for="first_name" class="mb-2">
                                            First Name
                                        </Label>
                                        <Input
                                            name="first_name"
                                            type="text"
                                            id="first_name"
                                            placeholder="Juan"
                                            required
                                        />
                                    </div>
                                    <div class="w-1/2">
                                        <Label for="last_name" class="mb-2">
                                            Last Name
                                        </Label>
                                        <Input
                                            name="last_name"
                                            type="text"
                                            id="last_name"
                                            placeholder="Dela Cruz"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label for="snum" class="mb-2">
                                        Student Number
                                    </Label>
                                    <Input
                                        name="student_number"
                                        type="text"
                                        id="snum"
                                        placeholder={`20XX-XXXXX`}
                                        pattern={"[0-9]{4}-*[0-9]{5}"}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>
                                        <span>Department</span>
                                        <Select
                                            name="department"
                                            id="department"
                                            class="mt-2"
                                            items={depts}
                                            bind:value={selectedDept}
                                            required
                                        />
                                    </Label>
                                </div>
                                <!-- <div>
                                    {#key isOther}
                                        <Label class="space-y-2">
                                            <span>(Non-CHE) Department</span>
                                            <Input
                                                disabled={!isOther}
                                                type="text"
                                                name="other_department"
                                                required
                                            />
                                        </Label>
                                    {/key}
                                </div> -->
                                <div>
                                    <Label class="mb-2">
                                        Course
                                    </Label>
                                    <Input
                                        type="text"
                                        name="course"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="sm:w-1/2 w-full mt-3 space-y-4 sm:pl-1.5">
                                <div>
                                    <Label for="phone" class="mb-2"
                                        >Phone Number</Label
                                    >
                                    <Input
                                        name="phone"
                                        type="tel"
                                        id="phone"
                                        placeholder="09xxxxxxxxx"
                                        pattern={"[0-9]{11}"}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label for="email" class="mb-2"
                                        >Email Address</Label
                                    >
                                    <Input
                                        name="email"
                                        type="email"
                                        id="email"
                                        autocomplete="email"
                                        placeholder="myemail@up.edu.ph"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label for="password" class="mb-2"
                                        >Password</Label
                                    >
                                    <Input
                                        name="password"
                                        bind:value={password}
                                        type="password"
                                        id="password"
                                        placeholder="•••••••••"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label for="confirm_password" class="mb-2">Confirm password</Label>
                                    <Input
                                        name="confirm_password" 
                                        bind:value={confirm_password} 
                                        type="password" 
                                        id="confirm_password" 
                                        placeholder="•••••••••" 
                                        required />
                                  </div>
                            </div>
                        </div>
                        <Button type="submit" class="w-full" disabled={loading}>Sign Up</Button>
                    </form>

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
    </div>
</section>

<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

<style lang="postcss">
    :global(html) {
        background-color: theme("colors.gray.200");
    }
</style>
