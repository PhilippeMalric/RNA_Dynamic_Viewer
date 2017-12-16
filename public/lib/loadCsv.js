var array2 = []

var config = {
    delimiter: ";",  // auto-detect
    newline: "",    // auto-detect
    quoteChar: '"',
    header: true,
    dynamicTyping: false,
    preview: 0,
    encoding: "",
    worker: false,
    comments: false,
    step: undefined,
    complete: undefined,
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined
}

jQuery.get('/js/__resultat_tsETERNA_R93_000all_so_extended.csv', function(data) {
    array2 = Papa.parse(data,config);
 
});


console.log("array2")
console.log(array2)