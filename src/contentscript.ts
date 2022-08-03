//Get information

const getTitle = () => {
    const tag = document.querySelector('h1.headline-1') as HTMLSpanElement;
    return tag?.innerText ?? "no data";
}

const getYearMovie = () => {
    const tag = document.querySelector("small > a") as HTMLSpanElement;
    return tag?.innerText ?? "no data"; 
}

const getDirector = () => {
    const tag = document.querySelector("span.prettify") as HTMLSpanElement;
    return tag?.innerText ?? "no data"; 
}

const getDescription = () => {
    const tag = document.querySelector('.truncate') as HTMLSpanElement;
    return tag?.innerText ?? 'no data';
}

const getRate = () => {
    const tag = document.querySelector('average-rating') as HTMLSpanElement;
    return tag?.innerText ?? 'no data';
}



const getFandom = () => {
    const tag = document.querySelectorAll('dd.fandom.tags > ul.commas > li > a.tag');
    const tagsArray = Array.from(tag);
    const fandomList = tagsArray.map((fandom) => { return fandom.textContent})
    return fandomList ?? "no data";
}

const getShips = () => {
    const tag = document.querySelectorAll('dd.relationship.tags > ul.commas > li > a.tag');
    const tagsArray = Array.from(tag);
    const shipsList = tagsArray.map((ship) => { return ship.textContent})
    return shipsList ?? "no data";
}

const getCategory = () => {
    const tag = document.querySelectorAll('dd.category.tags > ul.commas > li > a.tag');
    const tagsArray = Array.from(tag);
    const categoryList = tagsArray.map((cat) => { return cat.textContent})
    return categoryList ?? "no data";
}

const getCharacters = () => {
    const tag = document.querySelectorAll("dd.character.tags > ul.commas > li > a.tag");
    const tagsArray = Array.from(tag);
    const charList = tagsArray.map((char) => { return char.textContent})
    return charList ?? "no data";
}

const getTagsFreeform = () => {
    const tag = document.querySelectorAll("dd.freeform.tags > ul.commas > li > a.tag");
    const tagsArray = Array.from(tag);
    const tagsList = tagsArray.map((tags) => { return tags.textContent})
    return tagsList ?? "no data";
}

const title = getTitle();
const fandom = getFandom();
const ships = getShips();
const characters = getCharacters();
const year = getYearMovie();
const director = getDirector();
const category = getCategory();
const tags = getTagsFreeform();
const description = getDescription();
const rate = getRate();

const data = {
    title: title,
    Year: year, 
    Director: director,
    Description: description,
    GeneralRate: rate,
    fandom: fandom,
    ships: ships,
    characters: characters,
    category: category,
    tags: tags
}

console.log(data)


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: data});
    }
  );