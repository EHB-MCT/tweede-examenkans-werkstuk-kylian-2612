"use strict";

const artikels = {
    initfields() {
        document.getElementById("form").addEventListener("submit", e => {
            e.preventDefault();
            let inputValue = document.getElementById("keyword").value;
            // console.log("inputValue is de value van de invulveld", inputValue);
            this.renderArtikelsVolgensKeyword(inputValue);
        });
        document.getElementById("likes").addEventListener("change", e => {
            let inputValue = document.getElementById("keyword").value;
            if(inputValue == "" ){
                this.renderdata();
            }else if(inputValue != "" ){
                this.renderArtikelsVolgensKeyword(inputValue);
            }
            console.log("checked");
        });
    },
    renderdata() {
        document.getElementById("content").innerHTML="";
        fetch(`https://thecrew.cc/news/read.php`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                
                var checkLikes = document.getElementById("likes");
                if (checkLikes.checked === true){
                    data.news.sort((a,b) => {
                        return parseFloat(b.likes) - parseFloat(a.likes);
                    });
                }else if(checkLikes.checked === false){
                    this.renderdata();
                }
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

            var checkLikes = document.getElementById("likes");
            if (checkLikes.checked === true){
                console.log("waar");
                data.news.sort((a,b) => {
                    return parseFloat(a.likes) - parseFloat(b.likes);
                });

            }else if(checkLikes.checked === false){
                console.log("vals");
                this.renderArtikelsVolgensKeyword(auteur);
            }
            data.news.forEach(element => {
                let titleString = element.title;
                let contentString = element.content;
                if(titleString.includes(auteur) || contentString.includes(auteur)){
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