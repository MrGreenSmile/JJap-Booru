import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SearchBar, IllustratorList } from "./main.jsx"


function Searcher(props){
    let stater = "searcher"

    let Artist = props.Artist
    let [r18_state, r18_stater] = useState(true)
    var keyword = useParams().keyword.split("&")[1].replace('%20', " ")
    var category = useParams().keyword.split("&")[0]


    function titler(){
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = "JJap Booru : Search for '" + keyword + "'"
    }
    useEffect(titler)

    function R18_setter(){
        r18_stater(!r18_state)
    }
    window.onkeydown = function(event){
        switch(event.keyCode){
            case event.ctrlKey && 82:        //ctrl + r
                event.returnValue = false;
                R18_setter()
                break
            default:
        }
    }
    function solution(str1, str2){//str1 : 검색 / str2 : 비교할 거(배열안에)
        //https://steady-learner.tistory.com/entry/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4JS-%EB%B0%B0%EC%97%B4%EC%9D%98-%EC%9C%A0%EC%82%AC%EB%8F%84

        str1 = [...str1.toLowerCase()]
        str2 = [...str2.toLowerCase()]

        var answer = str1.filter(el => str2.includes(el)).length
        var similarity = Math.round(answer/str2.length * 10000) / 100

        var initial = str1[0] === str2[0]

        return [initial, similarity]
    }


    return(
        <div className="container">
            <SearchBar keyword={keyword} stater={stater} />

            {[...Artist].map((artist) =>
                category === "Artist" ? artist.name.toLowerCase().includes(keyword.toLowerCase()) : artist.tags.map(tag => tag.toUpperCase()).includes(keyword.toUpperCase()) ?
                    r18_state && artist.tags.includes('R-18') ?
                        <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                    : !artist.tags.includes('R-18') ? <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                : null
            : null
            )}
            {category === "Artist" ? [...Artist].map((artist) =>
                category === "Artist" ? solution(keyword, artist.name)[0] && solution(keyword, artist.name)[1] === 100 : null?
                    r18_state && artist.tags.includes('R-18') ?
                        <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                    : !artist.tags.includes('R-18') ? <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                : null
            : null
            ) :null}
            {category === "Artist" ? [...Artist].map((artist) =>
                category === "Artist" ? solution(keyword, artist.name)[0] && solution(keyword, artist.name)[1] > 100 : null ?
                    r18_state && artist.tags.includes('R-18') ?
                        <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                    : !artist.tags.includes('R-18') ? <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                : null
            : null
            ) :null}
            {category === "Artist" ? [...Artist].map((artist) =>
                category === "Artist" ? solution(keyword, artist.name)[0] && solution(keyword, artist.name)[1] < 100 && solution(keyword, artist.name)[1] > 60 : null ?
                    r18_state && artist.tags.includes('R-18') ?
                        <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                    : !artist.tags.includes('R-18') ? <IllustratorList artist={artist} illust={props.Illust} key={artist.name} />
                : null
            : null
            ) :null}
        </div>
    )
}


export default Searcher;