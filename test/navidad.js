function navidad(){
    var today = new Date();
    var faltante = new Date(today.getFullYear(),11,25);
    if(today.getMonth() == 11 && today.getDate()>25){
      faltante.setFullYear(faltante.getFullYear()+1);
      }
    var day = 1000*60*60*24;
    return Math.ceil((faltante.getTime()-today.getTime())/(day))+" dias faltantes para navidad";
    }
    navidad()