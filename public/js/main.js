let tableRows = document.querySelectorAll('.body_rows');
for(let i = 0; i < tableRows.length; i++){
    if(i % 2 === 0){
        tableRows[i].style.backgroundColor = 'gray';
    }else{
        continue;
    }
}