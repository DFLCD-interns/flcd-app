<script>
    import { goto, onNavigate } from "$app/navigation";
    import { browser } from "$app/environment";
    import { Input, Label, Button, Select, Alert } from "flowbite-svelte";
    import { ArrowLeftOutline } from "flowbite-svelte-icons";
    let selectedDept = "";
    let password, confirm_password;
    let match = true;

    let data;
    let form; 

    let workgroup = 4;
    let superior_id = 3;
    let pw_hash = "hash"

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Check if password and confirm password match
        if (!password || password !== confirm_password) {
            alert('Passwords do not match');
            return;
        }

        // Create FormData object from the form
        const formData = new FormData(event.target);

        // Manually append superior_id and workgroup to the FormData
        formData.append('workgroup', workgroup);
        formData.append('superior_id', superior_id);

        // placeholder for password hashing logic
        formData.append('pw_hash', pw_hash);

        console.log([...formData.values()]);

        // Remove '-' from the student number in preparation for insertion in database 
        const noDash = formData.get('student_number').split('-').join('');
        formData.set('student_number', noDash);

        // Iterate through FormData to check for empty values
        for (let [key, value] of formData.entries()) {
            if (!value) {
                alert(`Please fill out the ${key} field.`);
                return;
            }
        }

        try {
            const response = await fetch('?/register', {
                method: 'POST',
                body: formData
            });

            const body = await response.json();
            
            if (body) {
                alert('User created successfully!');
                goto(`/`);
            } else {
                throw new Error('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            alert(error);
        }
    }
    
    $: isOther = selectedDept == "other";
    let depts = [
        { value: "DCTID", name: "Department of Clothing, Textiles, and Interior Design" },
        { value: "DFLCD", name: "Department of Family Life and Child Development" },
        { value: "DFSN", name: "Department of Food Science and Nutrition" },
        { value: "DHeEd", name: "Department of Home Economics Education" },
        { value: "DHRIM", name: "Department of Hotel, Restaurant, and Institution Management" },
        { value: "other", name: "Other..." },
    ];

    function navBack() {
        if (browser) window.history.back();
    }
</script>

<section class="bg-gray-200 min-h-screen flex items-center justify-center p-5">
    <div class="bg-gray-100 w-full flex rounded-xl max-w-4xl drop-shadow-xl">
        <div class="w-full ps-3 pe-3 pb-6">
            <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full" >
                <div class="sm:w-full sm:mx-auto w-full relative">
                    <Button
                        color="alternative"
                        class="!p-2 absolute top-0 left-0"
                        on:click={() => {
                            navBack();
                        }}><ArrowLeftOutline class="w-6 h-6" />
                    </Button>
                    <img
                        class="mx-auto h-10 w-auto"
                        src="https://che.upd.edu.ph/wp-content/uploads/2022/10/DFLCD-Logo.png"
                        alt="DFLCD"
                    />
                    <h2
                        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" >
                        Make a new account
                    </h2>
                </div>

                <div class="mt-5">
                    {#if !match}
                    <Alert border color="red">
                        <span class="font-medium">Passwords don't match!</span>
                        Please try again.
                      </Alert>
                    {/if}

                    <form on:submit|preventDefault={handleSubmit} class="space-y-3">
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
                                            class="mt-2"
                                            items={depts}
                                            bind:value={selectedDept}
                                        />
                                    </Label>
                                </div>
                                <div>
                                    {#key isOther}
                                        <Label class="space-y-2">
                                            <span>(Non-CHE) Department</span>
                                            <Input
                                                disabled={!isOther}
                                                type="text"
                                                name="department"
                                            />
                                        </Label>
                                    {/key}
                                </div>
                                <div>
                                    <Label>
                                        Course
                                        <Input
                                            type="text"
                                            name="course"
                                            required
                                        />
                                    </Label>
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
                                    <Input bind:value={confirm_password} type="password" id="confirm_password" placeholder="•••••••••" required />
                                  </div>
                            </div>
                        </div>
                            <Button on:click={() =>{handleSubmit()}} type="submit" class="w-full">Sign Up</Button>
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
