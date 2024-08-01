<script>
    /** @type {import('./$types').PageData} */
    export let data;
    export let form;
    
    import {Badge, Button, GradientButton} from 'flowbite-svelte'
    import { ArrowLeftOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    console.log(data)
    let requestInfo = data.body.reqdetails[0];

    let request_type = "";

    if (data.body.type == "equipment_requests"){
        request_type = "Equipment Requests"
    }
    else if (data.body.type == "venue_requests"){
        request_type = "Venue Requests"
    }

    if (requestInfo.studentno == null){
        requestInfo.studentno = "none";
    }
    console.log('What')
    console.log(requestInfo)
    console.log(data)
    

    let totalStatus = "";
    $: approvalStatuses = data?.body.approvalFormStatuses;
    $: approverNames = data?.body.approverNames;
    
    onMount(async () => {
        console.log('Component mounted.');
        try {
            if (approvalStatuses == undefined || approvalStatuses.length == 0) {
                console.error('ERROR');
                throw new Error('no retrieved forms for the time being');
            }
            
            console.log(approverNames);
            console.log(approvalStatuses.findIndex((status) => status === 'Pending'));

            if (approvalStatuses.includes("Declined"))
                totalStatus = "Declined";
            else if (approvalStatuses.includes("Pending"))
                totalStatus = "Pending with " + approverNames[approvalStatuses.findIndex((status) => status === 'Pending')];
            else if (approvalStatuses.every((elem) => elem === "Approved"))
                totalStatus = "Approved";
            else {
                totalStatus = "Cannot be determined";
                console.error("Total status of form cannot be determined.")
            } 

            if (data?.success)
                console.log('Retrieved approval forms.');
            else throw new Error('failed to retrieve approval forms.');
        } catch (error) {
            console.error('Error retrieving approval forms:', error);
        }

        return () => approvalForms = [];
    })

    

    // let requestInfo = {
    //     reqid: data.reqdetails.reqid,
    //     type: rtype,
    //     name: data.reqdetails.requester_firstname + data.reqdetails.requester_last_name,
    //     email: data.reqdetails.email,
    //     studentno: data.reqdetails.studentno,
    //     contactno: data.reqdetails.contactno,
    //     dateneeded: data.reqdetails.dateneeded,
    //     admin: data.reqdetails.admin_firstname + data.reqdetails.admin_lastname,
    //     dept: data.reqdetails.dept,
    //     material: data.reqdetails.material,
    //     number:data.reqdetails.number,
    //     room:data.reqdetails.room,
    //     adminemail:data.reqdetails.adminemail,
    //     returndate:data.reqdetails.returndate
    // }
    // console.log(requestInfo)

    // let requestInfo =
    //   {
    //     reqid:"0",
    //     status:"Pending",
    //     type:"Equipment Request",
    //     name:"Christian Magaway",
    //     email:"clmagaway@up.edu.ph",
    //     studentno:"None",
    //     contactno:"09218344896",
    //     dateneeded:"June 21, 2024",
    //     timeneeded:"8:00 AM",
    //     admin:"Asst. Prof. Joseph G. Taluban Jr.",
    //     dept:"DCTID",
    //     class:"None",
    //     course:"None",
    //     material:"Speaker",
    //     number:"1",
    //     reason:"Used for interior design mock board assessment and monitoring",
    //     usedate:"June 21, 2024",
    //     usetime:"8:00 AM",
    //     room:"CHE Museum Room 104",
    //     staff:"Ms. Mikee",
    //     adminemail:"jgtaluban@up.edu.ph",
    //     returndate:"June 21, 2024",
    //     returntime:"3:00 PM"
    //   }
</script>


<div class = "min-h-screen  p-10">
    <div class="w-full items-center justify-between">
        <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
        <h2 class="pt-3 text-2xl font-semibold text-gray-600">{request_type}: {requestInfo.material}</h2>
        <Badge class="mt-2" large border color='yellow'> Pending</Badge>
    </div>
    <div class="min-w-full md:flex pt-5 gap-10 justify-center">
        <div class="bg-white flex items-center justify-center rounded-lg shadow-lg p-6">
            <div class="overflow-x-auto">
            <table class="table-fixed object-cover">
                <tbody class="text-gray-600">
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name</td>
                    <td class="py-3 px-4">{requestInfo.requester_firstname} {requestInfo.requester_lastname}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email</td>
                    <td class="py-3 px-4">{requestInfo.email}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Student number</td>
                    <td class="py-3 px-4">{requestInfo.studentno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Contact number</td>
                    <td class="py-3 px-4">{requestInfo.contactno}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Date needed</td>
                    <td class="py-3 px-4">{requestInfo.date_needed_start}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestInfo.admin_firstname} {requestInfo.admin_lastname}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/section</td>
                    <td class="py-3 px-4">{requestInfo.dept}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Requested equipment</td>
                    <td class="py-3 px-4">{requestInfo.material}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage date</td>
                    <td class="py-3 px-4">{requestInfo.dateneeded}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Room where the equipment will be used</td>
                    <td class="py-3 px-4">{requestInfo.room}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email address of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestInfo.adminemail}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return date</td>
                    <td class="py-3 px-4">{requestInfo.returndate}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="space-y-10 relative">
        <div class="bg-white rounded-lg p-8 shadow-md">
            <h2 class="text-gray-600 text-lg mb-1 font-medium title-font">Approval Status</h2>
            {#each approvalStatuses as status, index} 
                <p class="text-gray-600" >
                    {index > 0 && approvalStatuses[index-1] === 'Pending' ? '🔒 Invisible to' :
                        status === 'Approved' ? '✔️ Approved by' : 
                        status === 'Declined' ? '❌ Declined by' : 
                        totalStatus === 'Declined' ? '🔒 Invisible to' :
                        status === 'Pending' ?  '⌛ Pending with' : 
                                                'Status unknown with'}
                    {approverNames[index]}

                </p>
            {/each}
        </div>
        <div class="pt-10 bg-white rounded-lg p-8 shadow-md">
            <h1 class="text-gray-600 text-lg mb-1 font-medium title-font">Form Approval</h1>
            <form bind:this={form} action="?/approve" method="POST">
                <div class="relative mb-4">
                    <input 
                        id="remarks" 
                        name="remarks" 
                        placeholder="Remarks and comments."
                        class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                </div>
                <div class="flex justify-center">
                    <!-- Hidden input field to store the status -->
                    <input type="hidden" id="status" name="status" />
                    <button 
                        on:click={() => form.querySelector('input[name="status"]').value = "Approved"}
                        type="submit" 
                        class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">
                        Approve
                    </button>
                    <button
                        on:click={() => form.querySelector('input[name="status"]').value = "Declined"}
                        type="submit" 
                        class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">
                        Decline
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</div>