<script>
    import {Button, Card} from 'flowbite-svelte';
    export let data;
    export let equipmentTable = data.equipmentTable;

    function downloadCSV(table) {
        console.log('downloading...')
        const csvData = convertToCSV(table);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function convertToCSV(d) {
        const headers = Object.keys(d[0]).join(',') + '\n';
        const rows = d.map(row => Object.values(row).join(',')).join('\n');
        return headers + rows;
    }
</script>

<div class = "p-2 grid grid-cols-2 gap-3">
    <Card>
        <div class = "p-2 grid grid-cols-2 gap-3">
        <Button on:click={downloadCSV(equipmentTable)}>
            Download Equipment
        </Button>
        <Button>
            Download Classes
        </Button>
        <Button>
            Download Venues
        </Button>
    </div>
    </Card>
</div>