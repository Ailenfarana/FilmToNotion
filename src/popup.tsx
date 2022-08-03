

const { Client } = require("@notionhq/client")
const notion = new Client({ auth: 'secret_lFmo6IRuuLUdnFihfm4UVlMVCITPiH6pej4C6efC1oI' })
const databaseId = '0ad078518a6545b39f224f00235a6eb4';
const res = document.querySelector('#resul');
const btn = document.querySelector('button');
const btnSave = document.querySelector(".saved");

chrome.tabs.query({currentWindow: true, active: true}, tabs => {
    const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
    chrome.tabs.sendMessage(currentTabID, {greeting: "hello"}, response => {
        console.log('mensaje desde content', response.farewell);
        let respuesta = response.farewell;
        console.log(respuesta)

        const printResult = (data:any) => {
          
          const titulo = document.querySelector(".titulo") as HTMLSpanElement;
          titulo.innerText = ` ${data.title}`;
          const fandom = document.querySelector(".fandom") as HTMLSpanElement;
          fandom.innerText = ` ${data.fandom.join(" , ")}`;
          const relationships = document.querySelector(".ships") as HTMLSpanElement;
          relationships.innerText = ` ${data.ships.join(" , ")}`;
          const characters = document.querySelector('.chars') as HTMLSpanElement;
          characters.innerText = ` ${data.characters.join(" , ")}`;
          const words = document.querySelector('.words') as HTMLSpanElement;
          words.innerText = ` ${data.words}`;
          const rating = document.querySelector('.rating') as HTMLSpanElement;
          rating.innerText = ` ${data.rating}`;
          const catogory = document.querySelector('.category') as HTMLSpanElement;
          catogory.innerText = ` ${data.category.join(" , ")}`;
          const tags = document.querySelector('.tags') as HTMLSpanElement;
          tags.innerText = ` ${data.tags.join(" , ")}`;
  
             
        }
  
        printResult(respuesta);

        const titleName = respuesta.title;
        const fandomList = respuesta.fandom;
        const shipList = respuesta.ships;
        const charList = respuesta.characters;
        const wordsCount = parseInt(respuesta.words);
        const rating = respuesta.rating;
        const catList = respuesta.category;
        const tagsList = respuesta.tags;


        let ratingFinal = {name: rating}


        //console.log(shipList);

        let finalObjShips: never[] = [];
        let finalObjFandom: never[] = [];
        let finalObjChar: never[] = [];
        let finalObjCat: never[] = [];
        let finalObjtags: never[] = [];
      
        finalObjShips = shipList.map((shipObject: any) => {
          let returnObject = {name : shipObject}
          return returnObject;
        })
        finalObjFandom = fandomList.map((fandomObject: any) => {
          let returnObject = {name : fandomObject}
          return returnObject;
        })
        finalObjChar = charList.map((charObject: any) => {
          let returnObject = {name : charObject}
          return returnObject;
        })
        finalObjCat = catList.map((catObject: any) => {
          let returnObject = {name : catObject}
          return returnObject;
        })
        finalObjtags = tagsList.map((tagObject: any) => {
          let returnObject = {name : tagObject}
          return returnObject;
        })
        
        
        async function addItem(titleName: any, finalObjFandom: any ,finalObjShips: any, finalObjChar: any, finalObjCat: any, finalObjtags: any, wordsCount: any, ratingFinal: any) {
          try {
              await notion.pages.create({
                parent     : { database_id: databaseId },
                properties : {
                  title: { 
                    title:[
                      {
                        "text": {
                          "content": titleName
                        }
                      }
                    ]
                  },
                  'Fandom' : {
                    "type"         : "multi_select",
                    "multi_select" : finalObjFandom
                  },
                'Relationships' : {
                  "type"         : "multi_select",
                  "multi_select" : finalObjShips
                },
                'Characters' : {
                  "type"         : "multi_select",
                  "multi_select" : finalObjChar
                },
                'Category' : {
                  "type"         : "multi_select",
                  "multi_select" : finalObjCat
                },
                'Tags' : {
                  "type"         : "multi_select",
                  "multi_select" : finalObjtags
                },
                "Words" : {
                  "type"    : "number",
                    "number": wordsCount
                },
                "Rating" : {
                  "type"    : "select",
                  "select": ratingFinal
                },

                },
              })
          console.log(response)
          btnSave?.classList.remove('d-none')
        } catch (error) {
          console.error('upss')
        }
      }


      const addToNotion = (e : any) => {
        e.stopPropagation();

          addItem(titleName, finalObjFandom, finalObjShips, finalObjChar, finalObjCat, finalObjtags, wordsCount, ratingFinal);
      }

      btn?.addEventListener('click', addToNotion)
      
      })

      
         });


