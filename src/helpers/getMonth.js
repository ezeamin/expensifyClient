let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

export default function getMonth(current,month) {

    if(current){
      //get current month
      month = new Date().getMonth();
    }

    return meses[month];
}