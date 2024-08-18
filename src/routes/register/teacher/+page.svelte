<script>
    import { enhance } from '$app/forms';
    import { Input, Label, Button, Select } from "flowbite-svelte";
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
    
    let depts = [
        { value: "DCTID", name: "Department of Clothing, Textiles, and Interior Design" },
        { value: "DFLCD", name: "Department of Family Life and Child Development" },
        { value: "DFSN", name: "Department of Food Science and Nutrition" },
        { value: "DHeEd", name: "Department of Home Economics Education" },
        { value: "DHRIM", name: "Department of Hotel, Restaurant, and Institution Management" },
    ];
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 w-full flex rounded-xl max-w-4xl drop-shadow-xl">
        <div class="w-full ps-3 pe-3 pb-2">
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
                <div class="sm:w-full sm:mx-auto w-full relative">
                    <Button
                        color="alternative"
                        class="!p-2 absolute top-0 left-0"
                        href="/register">
                        <ArrowLeftOutline class="w-6 h-6" />
                    </Button>
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" >
                        <svg 
                            class="inline align-middle h-10 w-auto mt-[-0.75rem] ml-[-0.4rem] mr-[-0.3rem]" 
                            viewBox="0 0 368 73" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M351.584 43.1176C360.65 38.1485 364.157 26.4822 359.416 17.0601C354.675 7.63803 343.483 4.02818 334.416 8.99728C325.35 13.9664 321.843 25.6327 326.584 35.0548C331.325 44.4769 342.517 48.0867 351.584 43.1176Z" fill="#A01F23"/>
                            <path d="M334.556 21.7893C335.428 20.5474 336.717 19.7816 338.185 19.616C339.296 19.4918 340.327 19.7402 341.299 20.3611C341.794 20.6716 342.231 21.0649 342.647 21.5409C342.945 20.9821 343.302 20.4853 343.718 20.0713C344.531 19.2434 345.503 18.7673 346.594 18.6431C348.061 18.4775 349.489 18.9329 350.6 19.9471C351.691 20.9407 352.385 22.3896 352.563 24.0248C352.742 25.7014 352.305 27.3159 351.195 29.096C350.203 30.6898 348.696 32.3457 346.951 34.2914C346.356 34.9537 345.681 35.6989 344.987 36.4854C344.809 36.6924 344.551 36.8373 344.273 36.858C343.996 36.8994 343.738 36.8166 343.5 36.651C342.647 36.03 341.834 35.4505 341.12 34.9537C339.018 33.4634 337.193 32.1801 335.884 30.8554C334.417 29.3858 333.663 27.8955 333.485 26.2189C333.326 24.5837 333.703 23.0106 334.556 21.7893Z" fill="white"/>
                            <path d="M22.656 28.04H36.111C39.351 28.04 42.216 28.685 44.706 29.975C47.226 31.265 49.176 33.065 50.556 35.375C51.966 37.685 52.671 40.325 52.671 43.295C52.671 46.415 51.981 49.16 50.601 51.53C49.251 53.9 47.316 55.745 44.796 57.065C42.306 58.355 39.411 59 36.111 59H22.656V28.04ZM35.661 50.9C37.911 50.9 39.621 50.195 40.791 48.785C41.991 47.345 42.591 45.485 42.591 43.205C42.591 41.045 42.006 39.335 40.836 38.075C39.696 36.785 37.971 36.14 35.661 36.14H32.601V50.9H35.661ZM57.0212 28.04H78.3512V34.88H66.6962V41.135H77.4962V46.805H66.6962V59H57.0212V28.04ZM82.6853 28.04H92.4053V52.16H103.16V59H82.6853V28.04ZM120.688 59.72C117.688 59.72 114.958 59.015 112.498 57.605C110.068 56.165 108.133 54.215 106.693 51.755C105.283 49.265 104.578 46.52 104.578 43.52C104.578 40.46 105.268 37.7 106.648 35.24C108.028 32.78 109.918 30.86 112.318 29.48C114.718 28.07 117.418 27.365 120.418 27.365C122.038 27.365 123.628 27.56 125.188 27.95C126.748 28.34 128.083 28.895 129.193 29.615L127.978 36.59C125.818 35.78 123.868 35.375 122.128 35.375C119.728 35.375 117.883 36.08 116.593 37.49C115.303 38.87 114.658 40.865 114.658 43.475C114.658 46.025 115.333 48.02 116.683 49.46C118.063 50.87 119.968 51.575 122.398 51.575C123.328 51.575 124.198 51.485 125.008 51.305C125.818 51.125 126.808 50.795 127.978 50.315L129.238 57.425C126.628 58.955 123.778 59.72 120.688 59.72ZM133.266 28.04H146.721C149.961 28.04 152.826 28.685 155.316 29.975C157.836 31.265 159.786 33.065 161.166 35.375C162.576 37.685 163.281 40.325 163.281 43.295C163.281 46.415 162.591 49.16 161.211 51.53C159.861 53.9 157.926 55.745 155.406 57.065C152.916 58.355 150.021 59 146.721 59H133.266V28.04ZM146.271 50.9C148.521 50.9 150.231 50.195 151.401 48.785C152.601 47.345 153.201 45.485 153.201 43.205C153.201 41.045 152.616 39.335 151.446 38.075C150.306 36.785 148.581 36.14 146.271 36.14H143.211V50.9H146.271Z" fill="#323232"/>
                            <path d="M180.667 44.8438L182.285 44.8906C182.816 44.9062 184.519 44.9141 187.394 44.9141C190.269 44.9141 192.152 44.6797 193.042 44.2109C193.933 43.7422 194.378 43.0312 194.378 42.0781C194.378 41.125 193.839 40.2812 192.761 39.5469C191.683 38.8125 190.488 38.4453 189.175 38.4453C186.878 38.4453 184.988 39.0312 183.503 40.2031C182.019 41.375 181.074 42.9219 180.667 44.8438ZM196.394 51.6172C197.769 51.6172 198.457 52.2344 198.457 53.4688C198.457 54.0312 198.238 54.6641 197.8 55.3672C197.378 56.0547 196.753 56.6953 195.925 57.2891C193.988 58.6641 191.449 59.3516 188.308 59.3516C185.183 59.3516 182.472 58.2969 180.175 56.1875C179.035 55.1406 178.121 53.8516 177.433 52.3203C176.746 50.7891 176.402 49.1094 176.402 47.2812C176.402 43.7188 177.574 40.7422 179.917 38.3516C182.261 35.9453 185.214 34.7422 188.777 34.7422C191.746 34.7422 194.097 35.4688 195.832 36.9219C197.582 38.3594 198.457 40.1328 198.457 42.2422C198.457 44.3516 197.605 45.9297 195.902 46.9766C194.199 48.0078 190.964 48.5234 186.199 48.5234C184.933 48.5234 183.058 48.4766 180.574 48.3828C180.855 50.8047 181.792 52.625 183.386 53.8438C184.98 55.0469 186.644 55.6484 188.378 55.6484C190.113 55.6484 191.48 55.4609 192.48 55.0859C193.496 54.6953 194.222 54.0234 194.66 53.0703C195.113 52.1016 195.691 51.6172 196.394 51.6172ZM204.764 25.976H215.132V51.704H226.604V59H204.764V25.976ZM240.48 59.384C238.4 59.384 236.448 58.84 234.624 57.752C232.832 56.632 231.392 55.128 230.304 53.24C229.216 51.32 228.672 49.192 228.672 46.856C228.672 44.552 229.216 42.472 230.304 40.616C231.392 38.728 232.848 37.256 234.672 36.2C236.496 35.144 238.432 34.616 240.48 34.616C242.144 34.616 243.68 35.08 245.088 36.008C246.528 36.936 247.616 38.328 248.352 40.184V34.616H258.432V59H248.352V54.536C246.752 57.768 244.128 59.384 240.48 59.384ZM243.6 51.8C244.88 51.8 245.968 51.352 246.864 50.456C247.792 49.528 248.288 48.44 248.352 47.192V46.808C248.288 45.528 247.776 44.44 246.816 43.544C245.888 42.648 244.816 42.2 243.6 42.2C242.256 42.2 241.104 42.68 240.144 43.64C239.216 44.568 238.752 45.688 238.752 47C238.752 48.344 239.232 49.48 240.192 50.408C241.152 51.336 242.288 51.8 243.6 51.8ZM273.902 59.384C271.822 59.384 269.87 58.84 268.046 57.752C266.254 56.632 264.814 55.128 263.726 53.24C262.638 51.32 262.094 49.192 262.094 46.856C262.094 44.552 262.638 42.472 263.726 40.616C264.814 38.728 266.27 37.256 268.094 36.2C269.918 35.144 271.854 34.616 273.902 34.616C275.566 34.616 277.102 35.08 278.51 36.008C279.95 36.936 281.038 38.328 281.774 40.184V34.616H291.854V59H281.774V54.536C280.174 57.768 277.55 59.384 273.902 59.384ZM277.022 51.8C278.302 51.8 279.39 51.352 280.286 50.456C281.214 49.528 281.71 48.44 281.774 47.192V46.808C281.71 45.528 281.198 44.44 280.238 43.544C279.31 42.648 278.238 42.2 277.022 42.2C275.678 42.2 274.526 42.68 273.566 43.64C272.638 44.568 272.174 45.688 272.174 47C272.174 48.344 272.654 49.48 273.614 50.408C274.574 51.336 275.71 51.8 277.022 51.8ZM296.716 35.288H306.364V40.184C308.22 36.472 311.164 34.616 315.196 34.616C318.268 34.616 320.668 35.72 322.396 37.928C324.156 40.104 325.036 43.128 325.036 47V59H314.956V45.992C314.956 44.616 314.652 43.56 314.044 42.824C313.468 42.088 312.652 41.72 311.596 41.72C310.828 41.72 310.076 41.976 309.34 42.488C308.604 42.968 307.996 43.672 307.516 44.6C307.068 45.528 306.844 46.584 306.844 47.768V59H296.716V35.288Z" fill="#287C41"/>
                        </svg>                            
                        Faculty & Staff Sign Up
                    </h2>
                </div>

                <div class="mt-5">
                    <form class="space-y-3" method="POST" action="?/register" use:enhance={submitRegister}>
                        <div class="flex flex-wrap align-center">
                            <div class="sm:w-1/2 w-full mt-3 space-y-4 sm:pr-1.5">
                                <div class="flex items-center space-x-2">
                                    <div class="w-1/2">
                                        <Label for="first_name" class="mb-2"
                                            >First name</Label
                                        >
                                        <Input
                                            name="first_name"
                                            type="text"
                                            id="first_name"
                                            placeholder="Juan"
                                            required
                                        />
                                    </div>
                                    <div class="w-1/2">
                                        <Label for="last_name" class="mb-2"
                                            >Last name</Label
                                        >
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
                                    <Label for="phone" class="mb-2"
                                        >Phone number</Label
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
                                    <Label>
                                        Department
                                        <Select
                                            name="department"
                                            class="mt-2"
                                            items={depts}
                                            bind:value={selectedDept}
                                            required
                                        />
                                    </Label>
                                </div>
                            </div>
                            <div
                                class="sm:w-1/2 w-full mt-3 mb-3 space-y-4 sm:pl-1.5"
                            >
                                <div>
                                    <Label for="email" class="mb-2"
                                        >Email address</Label
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
                                        required 
                                    />
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
