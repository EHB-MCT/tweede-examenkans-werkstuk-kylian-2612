"use strict";

const artikels = {
    initfields() {
        document.getElementById("form").addEventListener("submit", e => {
            e.preventDefault();
            let inputValue = document.getElementById("keyword").value;
            // console.log("inputValue is de value van de invulveld", inputValue);
            this.renderArtikelsVolgensKeyword(inputValue);
        });

    },
    renderdata() {

        fetch(`https://thecrew.cc/news/read.php`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data); 
                data.news.forEach(element => {
                    let html = `<article> 
                    <h1>${element.title}</h1>
                    <img src="${element.imageURI}">
                    <p>${element.content}</p>
                </article>`;
                document.getElementById("content").insertAdjacentHTML("beforeend", html);



/*                 class content{
                    constructor(info){
                        this._UUID = element.UUID;
                        this._title = element.title;
                        this._content = element.content;
                        this._imageURI = element.imageURI;
                        this._likes = element.likes;
                        this._date = element.publicationDate;
                    }
                like(){  
                }
                } */

                });
            });
    }, 
    postData(){
        fetch("https://thecrew.cc/news/create.php", {
            method: 'POST', 
            body: JSON.stringify({
                //UUID: element.UUID 

            })
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
          })
        .catch((err)=>console.log(err));
    },
    renderArtikelsVolgensKeyword(auteur){
        fetch(" https://thecrew.cc/news/read.php")
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data); 
            document.getElementById("content").innerHTML="";
            data.news.forEach(element => {
                let titleString = element.title;
                if(titleString.includes(auteur)){
                    console.log("ok");
                    
                    let html = `<article> 
                    <h1>${element.title}</h1>
                    <img src="${element.imageURI}">
                    <p>${element.content}</p>
                </article>`;
                document.getElementById("content").insertAdjacentHTML("beforeend", html);
                }
        });
    });
    }


};
artikels.initfields();
artikels.renderdata();