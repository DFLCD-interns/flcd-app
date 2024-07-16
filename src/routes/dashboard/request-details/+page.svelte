<script>
    import { ChevronLeftOutline } from 'flowbite-svelte-icons';
    function handleClick() {
        window.location.href = "/";
    }
</script>




<div class = "min-h-screen  p-10">
    <div class="w-full flex items-center justify-between">
        <a href="\dashboard"><ChevronLeftOutline class="size-10 text-gray-600"></ChevronLeftOutline></a>
        <h2 class="text-2xl font-semibold text-gray-600">Equipment Request</h2>
        <h2 class="text-xl font-semibold text-yellow-600">Pending</h2>
    </div>
    <div class="md:flex pt-10 gap-10 justify-center">
        <div class="bg-white flex items-center justify-center rounded-lg shadow-lg p-6">
            <div class="overflow-x-auto ">
            <table class="min-w-full">
                <tbody class="text-gray-600">
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name</td>
                    <td class="py-3 px-4">Christian Magaway</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email</td>
                    <td class="py-3 px-4">clmagaway@up.edu.ph</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Student number</td>
                    <td class="py-3 px-4">None</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Contact number<noframes></noframes>eeded</td>
                    <td class="py-3 px-4">09218344896</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Date<noframes></noframes>eeded</td>
                    <td class="py-3 px-4">Jun 21, 2024</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Time needed</td>
                    <td class="py-3 px-4">8:00 AM</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Name of admin/daculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">Asst. Prof. Joseph G. Taluban Jr.</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Department/section</td>
                    <td class="py-3 px-4">DCTID</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Preschool class assigned</td>
                    <td class="py-3 px-4">None</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">College course subject</td>
                    <td class="py-3 px-4">None</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Requested equipment</td>
                    <td class="py-3 px-4">Lapel microphone RODE</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Number of requested equipment</td>
                    <td class="py-3 px-4">1</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Reason to use the equipment</td>
                    <td class="py-3 px-4">Used for Interior Design Mock Board Assessment and Mentoring</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage date</td>
                    <td class="py-3 px-4">Jun 21, 2024</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment usage time</td>
                    <td class="py-3 px-4">8:00 AM</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Room where the equipment will be used</td>
                    <td class="py-3 px-4">CHE MUSEUM ROOM 104</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Assisting staff</td>
                    <td class="py-3 px-4">Ms. Mikee</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email address of admin/faculty in charge or coordinating teacher</td>
                    <td class="py-3 px-4">jgtaluban@up.edu.ph</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Email address</td>
                    <td class="py-3 px-4">clmagaway@up.edu.ph</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return date</td>
                    <td class="py-3 px-4">Jun 21, 2024</td>
                </tr>
                <tr class="border-b border-blue-gray-200">
                    <td class="py-3 px-4 font-semibold">Equipment return time</td>
                    <td class="py-3 px-4">3:00 PM</td>
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

    