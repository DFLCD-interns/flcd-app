export function downloadCSV(table, name = "") {
    console.log('downloading...')
    const csvData = convertToCSV(table);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_data.csv`;
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