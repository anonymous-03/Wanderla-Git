let cards=document.getElementsByClassName("card");

for(let card of cards){
    let data=card.getAttribute("data-card-id");
    card.addEventListener("click",()=>{
        window.location.href=`/listings/${data}`;
    })
}


const taxSwitch = document.getElementById("switchCheckDefault");

taxSwitch.addEventListener("click", () => {
  const taxforms = document.getElementsByClassName("tax-forms");

  for (let taxes of taxforms) {
    if (taxes.style.display !== "inline") {
      taxes.style.display = "inline";
    } else {
      taxes.style.display = "none";
    }
  }
});