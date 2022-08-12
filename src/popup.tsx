

const { Client } = require("@notionhq/client")
const notion = new Client({ auth: '' /* key */ })
const databaseId = ''/* id database */;
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
          const director = document.querySelector(".director") as HTMLSpanElement;
          director.innerText = ` ${data.director}`;
          const year = document.querySelector(".year") as HTMLSpanElement;
          year.innerText = ` ${data.year}`;
          const cast = document.querySelector('.cast') as HTMLSpanElement;
          cast.innerText = ` ${data.cast.join(" , ")}`;
          const description = document.querySelector('.description') as HTMLSpanElement;
          description.innerText = ` ${data.description}`;
          const genre = document.querySelector('.genre') as HTMLSpanElement;
          genre.innerText = ` ${data.genre .join(" , ")}`;
             
        }
  
        printResult(respuesta);

        const titleName = respuesta.title;
        const director = respuesta.director;
        const year = respuesta.year;
        const cast = respuesta.cast;
        const description = respuesta.description;
        const genre= respuesta.genre;

        let finalObjCast: never[] = [];
        let finalObjGenre: never[] = [];
        
        finalObjCast = cast.map((castObject: any) => {
          let returnObject = {name : castObject}
          return returnObject;
        })
        finalObjGenre = genre.map((genreObject: any) => {
          let returnObject = {name : genreObject}
          return returnObject;
        })
      
        
        async function addItem(titleName: any, finalObjCast: any ,finalObjGenre: any, director : any, year: any, description: any) {
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
                  Year: {
                    rich_text: [
                      {
                        text: {
                          content: year,
                        },
                      },
                    ],
                  },
                  Description: {
                    rich_text: [
                      {
                        text: {
                          content: description,
                        },
                      },
                    ],
                  },
                  Director: {
                    rich_text: [
                      {
                        text: {
                          content: director,
                        },
                      },
                    ],
                  },
                  'Cast' : {
                    "type"         : "multi_select",
                    "multi_select" : finalObjCast
                  },
                'Genre' : {
                  "type"         : "multi_select",
                  "multi_select" : finalObjGenre
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

          addItem(titleName, finalObjCast, finalObjGenre, director, year, description );
      }

      btn?.addEventListener('click', addToNotion)
      
      })

      
         });


