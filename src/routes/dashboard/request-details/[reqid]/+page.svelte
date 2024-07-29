<script>
    import {Badge, Button, GradientButton} from 'flowbite-svelte'
    import { ArrowLeftOutline } from 'flowbite-svelte-icons';
    import { page } from '$app/stores';
    let reqid = $page.params.reqid;
    let requestInfo =
      {
        reqid:"0",
        status:"Pending",
        type:"Equipment Request",
        name:"Christian Magaway",
        email:"clmagaway@up.edu.ph",
        studentno:"None",
        contactno:"09218344896",
        dateneeded:"June 21, 2024",
        timeneeded:"8:00 AM",
        admin:"Asst. Prof. Joseph G. Taluban Jr.",
        dept:"DCTID",
        class:"None",
        course:"None",
        material:"Speaker",
        number:"1",
        reason:"Used for interior design mock board assessment and monitoring",
        usedate:"June 21, 2024",
        usetime:"8:00 AM",
        room:"CHE Museum Room 104",
        staff:"Ms. Mikee",
        adminemail:"jgtaluban@up.edu.ph",
        returndate:"June 21, 2024",
        returntime:"3:00 PM"
      }
</script>


<div class = "min-h-screen  p-10">
    <div class="w-full items-center justify-between">
        <a href="/dashboard"><Button class="bg-white text-gray-500 hover:bg-white drop-shadow-md"><ArrowLeftOutline/></Button></a>
        <h2 class="pt-3 text-2xl font-semibold text-gray-600">{requestInfo.type}: {requestInfo.material}</h2>
        <Badge class="mt-2" large border color='yellow'> {requestInfo.status}</Badge>
    </div>
    <div class="min-w-full md:flex pt-5 gap-10 justify-center">
        <div class="bg-white flex items-center justify-center rounded-lg shadow-lg p-6">
            <div class="overflow-x-auto">
            <table class="table-fixed object-cover">
                <tbody class="text-gray-600">
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name</td>
                    <td class="py-3 px-4">{requestInfo.name}</td>
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
                    <td class="py-3 px-4">{requestInfo.dateneeded}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Time needed</td>
                    <td class="py-3 px-4">{requestInfo.timeneeded}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestInfo.admin}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/section</td>
                    <td class="py-3 px-4">{requestInfo.dept}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Preschool class assigned</td>
                    <td class="py-3 px-4">{requestInfo.class}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">College course subject</td>
                    <td class="py-3 px-4">{requestInfo.course}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Requested equipment</td>
                    <td class="py-3 px-4">{requestInfo.material}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Number of requested equipment</td>
                    <td class="py-3 px-4">{requestInfo.number}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Reason to use the equipment</td>
                    <td class="py-3 px-4">{requestInfo.reason}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage date</td>
                    <td class="py-3 px-4">{requestInfo.usedate}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage time</td>
                    <td class="py-3 px-4">{requestInfo.usetime}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Room where the equipment will be used</td>
                    <td class="py-3 px-4">{requestInfo.room}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Assisting staff</td>
                    <td class="py-3 px-4">{requestInfo.staff}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email address of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">{requestInfo.adminemail}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return date</td>
                    <td class="py-3 px-4">{requestInfo.returndate}</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return time</td>
                    <td class="py-3 px-4">{requestInfo.returntime}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="space-y-10 relative">
        <div class="bg-white rounded-lg p-8 shadow-md">
            <h2 class="text-gray-600 text-lg mb-1 font-medium title-font">Approval History</h2>
            <p class="text-gray-600" >Approved by jgtaluban@up.edu.ph</p>
            <p class="text-gray-600">Approved by cheflcd.upd@up.edu.ph</p>
            </div>
            <div class="pt-10 bg-white rounded-lg p-8 shadow-md">
            <h2 class="text-gray-600 text-lg mb-1 font-medium title-font">Comment</h2>
            <div class="relative mb-4">
            <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <div class="flex justify-center">
          <a href="\requests-history" class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">Approve</a>
          <button class="text-white border-0 py-2 px-6 rounded text-lg m-3 bg-gradient-to-r from-green-600 to-lime-300 hover:from-green-600 hover:to-green-600">Decline</button>
        </div>
        </div>
    </div>
  </div> 
 </div>

    