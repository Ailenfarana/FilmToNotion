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

const getCast = () => {
    const tag = document.querySelectorAll('a.text-slug.tooltip');
    const tagsArray = Array.from(tag);
    const castList = tagsArray.map((cast) => { return cast.textContent})
    const castListReduce = castList.slice(0,10)
    return castListReduce ?? "no data";
}

const getGenre = () => {
    const tag = document.querySelectorAll('#tab-genres > .text-sluglist > p > a.text-slug')
    const tagsArray = Array.from(tag);
    const genreList = tagsArray.map((genre) => { return genre.textContent})
    return genreList ?? "no data";
}




const title = getTitle();
const cast = getCast();
const year = getYearMovie();
const director = getDirector();
const description = getDescription();
const genre = getGenre();


const data = {
    title: title,
    Year: year, 
    Director: director,
    Description: description,
    cast: cast,
    genre: genre
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