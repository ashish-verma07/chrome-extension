/* eslint-disable no-undef */

function extractAirbnbData() {
  var searchedString = document.getElementById(
    "bigsearch-query-location-input"
  )?.value;
  const propertyListings = document.querySelectorAll(
    '[itemprop="itemListElement"]'
  );
  const propertiesData = [];
  propertyListings.forEach((listing) => {
    console.log("propertyListings", listing);
    const titleElement = listing.querySelector('[itemprop="name"]');
    const positionElement = listing.querySelector('[itemprop="position"]');
    const urlElement = listing.querySelector('[itemprop="url"]');

    if (titleElement && positionElement) {
      const title = titleElement.getAttribute("content");
      const position = positionElement.getAttribute("content");
      const url = urlElement.getAttribute("content");
      var urlTillQueryString = url.split("?");
      var urlSplit = urlTillQueryString[0].split("/");
      var roomId = urlSplit[2];

      var dynamicRoomSelectorId = `[aria-labelledby="title_${roomId}"`;
      const eachRoomDiv = listing.querySelector(dynamicRoomSelectorId);
      const roomDetails = eachRoomDiv.querySelectorAll(
        '[data-testid="listing-card-subtitle"]'
      );
      var roomAdditionalAttributes = "";
      roomDetails.forEach((eachAttrib) => {
        var outerText = eachAttrib.outerText.split("\n");
        outerText = outerText[0];
        roomAdditionalAttributes = roomAdditionalAttributes + outerText + ",";
      });
      roomAdditionalAttributes = roomAdditionalAttributes.slice(0, -1);

      propertiesData.push({
        searchKey: searchedString ? searchedString : "",
        name: title,
        position: position,
        roomId: roomId,
        roomAdditionalAttributes: roomAdditionalAttributes.replace("\n", " "),
      });
    }
  });

  console.log("propertiesData", propertiesData);
  return propertiesData;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchProducts") {
    const productList = extractAirbnbData();
    sendResponse(productList);
  }
});
