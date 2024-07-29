const search = document.getElementById("search");
const matchList = document.getElementById("matchList");

const itemDistrict = document.getElementById("district");
const itemAmphoe = document.getElementById("amphoe");
const itemProvince = document.getElementById("province");
const itemZipcode = document.getElementById("zipcode");

// Get thailand
const getThailand = async () => {
  const response = await fetch("./data/db.json");

  addresses = await response.json();
  //console.log(address);
};

// Search thailand.json and filter it
const searchAddress = (searchText) => {
  // Get matches to current text input
  let matchItems = addresses.filter((address) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return (
      address.district.match(regex) ||
      address.amphoe.match(regex) ||
      address.province.match(regex)
    );
  });

  if (searchText.length === 0) {
    matchItems = [];
    matchList.innerHTML = "";

    itemDistrict.value = "";
    itemAmphoe.value = "";
    itemProvince.value = "";
    itemZipcode.value = "";
  }

  //console.log(matchItems);
  // Add to match list
  outputHtml(matchItems);
};

// Show results in HTML
const outputHtml = (matchItems) => {
  if (matchItems.length > 0) {
    const html = matchItems
      .map(
        (item) =>
          `<li><span class="w3-small">${item.district}, ${item.amphoe}, ${item.province}, ${item.zipcode}</span><br></li>`
      )
      .join("");

    //console.log(html);
    matchList.innerHTML = `<ul class="match-items w3-ul w3-hoverable w3-border">${html}</ul>`;
    // Selection item
    matchList.addEventListener("click", selection);
  }
};

function selection(event) {
  const item = event.target;
  //console.log(item.firstChild.textContent);
  search.value = item.firstChild.textContent;
  matchList.innerHTML = "";

  const items = item.firstChild.textContent.split(", ");
  //console.log(items);

  itemDistrict.value = items[0];
  itemAmphoe.value = items[1];
  itemProvince.value = items[2];
  itemZipcode.value = items[3];
}

// Eventlistener
window.addEventListener("DOMContentLoaded", getThailand);
search.addEventListener("input", () => searchAddress(search.value));
