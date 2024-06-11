import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function Main(props){
    let stater = "main"

    let Artist = props.Artist
    let [r18_state, r18_stater] = useState(true)

    function titler(){
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = 'JJap Booru'
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


    return(
        <div className="container">
            <SearchBar stater={stater}/>

            {[...Artist].reverse().map((artist, index) => r18_state && artist.tags.includes('R-18') ?
                <IllustratorList artist={artist} illust={props.Illust} key={artist.name + "_" + index.toString()} stater={stater} />
                : !artist.tags.includes('R-18') ? <IllustratorList artist={artist} illust={props.Illust} key={artist.name + "_" + index.toString()} stater={stater} /> : null
            )}
        </div>
    )
}


function SearchBar(props){
    let stater = props.stater === "main"
    let [search_tag, search_tagger] = useState("Artist")

    function search_checke(event){
        search_tagger(event.target.value)
    }
    function searcher(event){
        switch(event.keyCode){
            case 13:        //enter
                window.location.href = stater ? "search/" + search_tag + "&" + event.target.value : search_tag + "&" + event.target.value
            break
            default:
        }
    }

    return(
    <div className='searchbar'>
        <input onKeyDown={(e) => searcher(e)} placeholder={stater ? null : props.keyword}/>

        <div className="searchbtn">
            <label>
                <input type="radio" name="search_index" value="Artist" onChange={search_checke} defaultChecked/>
                Artist
            </label>
            <label>
                <input type="radio" name="search_index" value="Tag" onChange={search_checke} />
                Tag
            </label>
        </div>
    </div>
    )
}

function IllustratorList(props){
    let stater = props.stater === "main" ? './' : '../'
    let artist = props.artist
    let index_last = 0

    return(
        <div className='illustrator-list'>
            <div className='illustrator-assets'>
                <div className='illustrator-name'><Link to={stater + "artist/" + artist.name + '__' + artist.artists_id}>{artist.name}</Link></div>
                <div className='illustrator-tags'>
                {artist.tags.map(tag => <div className={tag === "R-18" ? "R-18" : tag === "NSFW" ? "NSFW" : tag === "AI" ? "AI" : (tag === "Scat" ? "Scat" : null)} key={tag}>{tag}</div>)}
                </div>
            </div>

            <div className='illustrator-list-illust'>
            {props.illust.map(temp => 
                artist.name === temp.name.substr(0, temp.name.lastIndexOf('_')) && artist.artists_id === parseInt(temp.name.split('_id')[1]) ?
                    temp.illust.map((file_name) =>
                        file_name.includes("p0") && !file_name.includes('.mp4') && index_last < 5?
                        <>
                        {console.log(index_last++)}
                        <div>
                            <img className='illustrator-preview' src={stater + 'illust/' + temp.name + '/' + file_name} alt={file_name} key={file_name} />
                        </div>
                        </>
                        : null
                    ) : null
                )
            }
            </div>
      </div>
    )
  }
  

  export { Main, SearchBar, IllustratorList };