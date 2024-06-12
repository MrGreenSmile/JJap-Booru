import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import PlayIcon from '../player_icon.png'


function Illustrator(props){
    let artist_name = useParams().name.split('__')[0]
    let artist_id = useParams().name.split('__')[1]
    let Artist = props.Artist
    let Illust = props.Illust

    function titler(){
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = 'JJap Booru : ' + artist_name
    }
    useEffect(titler)
    useEffect(() => 
        window.scrollTo(0, 0)
    , [])

    window.onkeydown = function(event){
        switch(event.keyCode){
            case 90:        //z
                zoom_btn()
                break
            case 66:        //b
                window.history.back();
                break
            case 84:        //t
                totop(0, 0)
                break
            default:
        }
    }

    let [zoomed, set_zoomed] = useState('unzoomed')
    function zoom_btn(){
        zoomed === 'zoomed' ? set_zoomed('unzoomed') : set_zoomed('zoomed')
    }
    function totop(){
        window.scrollTo(0, 0)
    }


    return(
        <div className='illustrator-bio'>
            <h2 className='illustrator-name'>{artist_name}
                <span className='illustrator-illust-length'>(
                    {Illust.map((illust) =>
                        parseInt(illust.name.split('_id')[1]) === parseInt(artist_id) ?
                        illust.illust.length
                        : null
                        )
                    })
                </span>
                <div className='zoom-btn' onClick={zoom_btn}>{zoomed === 'zoomed' ? "(Z)oom out" : "(Z)oom in"}</div>
            </h2>
            {Artist.map((artist) => artist.artists_id === parseInt(artist_id)
                ? <BioLink artist_bio={artist} key={artist.name + "_bio"} />
                : null
                )
            }

            <div className='hashtags'>
            {Artist.map((artist) => artist.artists_id === parseInt(artist_id)
                ?
                <>
                    {artist.original_name ? <div className='original_name' key="original_name">{"#" + artist.original_name}</div> : null}
                    {artist.tags.map(tag => <div className={tag === "R-18" ? "R-18" : tag === "NSFW" ? "NSFW" : tag === "AI" ? "AI" : (tag === "Scat" ? "Scat" : null)}>{'#' + tag}</div>)}
                </>
                : null
                )
            }
            </div>
            

            <div className='illustrator-bio-illust'>
            {Artist.map((artist) =>
                artist.artists_id === parseInt(artist_id) ?
                Illust.map((illust) => 
                    artist.artists_id === parseInt(illust.name.split('_id')[1]) ?
                        illust.illust.map((ea) =>
                            <Resources artist_data={artist} illust_name={illust.name} url={ea} zoomed={zoomed} key={artist.name} />
                        )
                    : null
                ) : null
                )
            }
            </div>

            <div className='totop'>
                <button onClick={() => totop()}>(T)op</button>
            </div>
        </div>
    )
}
function Resources(props){
    //let twitter_id = props.artist_data.twitter ? props.artist_data.twitter : null
    let url = props.url
    let resource = url.split('/')[0] === 'pixiv'
         ? "https://www.pixiv.net/artworks/" + url.split('/')[1].split('_')[1]
     : url.split('/')[0] === 'twitter'
         ? "https://twitter.com/" + url.split('@')[1].split('.')[0] + "/status/" + url.split('/')[1].split('_')[1]
     : url.split('/')[0] === 'artstation'
     ? "https://www.artstation.com/artwork/" + url.split(' ')[1].split('_')[0]
     : null


    return(
        <div>
            <a href={resource} target='_blank' rel="noopener noreferrer">
            {url.includes('.mp4') ?
            <>
                <div className={'illustrator-bio-preview-player ' + props.zoomed}><img src={PlayIcon} alt="play icon" loading='lazy' /></div>
                <video onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} className={'illustrator-bio-preview ' + props.zoomed} src={'../illust/' + props.illust_name + '/' + url} alt={url} playsInline loop muted />
            </>
            : <img className={'illustrator-bio-preview ' + props.zoomed} src={'../illust/' + props.illust_name + '/' + url} alt={url} loading='lazy' />
            }
            </a>
        </div>
    )
}
function BioLink(props){
    let bios = props.artist_bio

    return(
        <div className='illustrator-bio-icon'>
            {bios.homepage ?
                <div>
                    <a href={bios.homepage} target='_blank' rel='noopener noreferrer'><img src="../bio/home.png" alt="home_bio" /></a>
                </div>
            : null
            }{bios.carrd ?
                <div>
                    <a href={"https://" + bios.carrd + ".carrd.co/"} target='_blank' rel='noopener noreferrer'><img src="../bio/carrd.png" alt='carrd_bio' /></a>
                </div>
            : null
            }{bios.lit_link ?
                <div>
                    <a href={"https://lit.link/en/" + bios.lit_link} target='_blank' rel='noopener noreferrer'><img src="../bio/lit link.png" alt='lit_link_bio' /></a>
                </div>
            : null
            }{bios.linktr ?
                <div>
                    <a href={"https://linktr.ee/" + bios.linktr} target='_blank' rel='noopener noreferrer'><img src="../bio/linktr.png" alt='linktr_bio' /></a>
                </div>
            : null
            }{bios.potofu ?
                <div>
                    <a href={"https://potofu.me/" + bios.potofu} target='_blank' rel='noopener noreferrer'><img src="../bio/potofu.png" alt='potofu_bio' /></a>
                </div>
            : null
            }{bios.profcard ?
                <div>
                    <a href={"https://profcard.info/u/" + bios.profcard} target='_blank' rel='noopener noreferrer'><img src="../bio/profcard.png" alt='profcard_bio' /></a>
                </div>
            : null
            }{bios.foriio ?
                <div>
                    <a href={"https://www.foriio.com/" + bios.foriio} target='_blank' rel='noopener noreferrer'><img src="../bio/foriio.png" alt='foriio_bio' /></a>
                </div>
            : null
            }{bios.privatter ?
                <div>
                    <a href={"https://privatter.net/u/" + bios.privatter} target='_blank' rel='noopener noreferrer'><img src="../bio/privatter.png" alt='privatter_bio' /></a>
                </div>
            : null
            }{bios.pixiv ? bios.pixiv.map(pixiv =>
            <div>
                <a href={'https://www.pixiv.net/users/' + pixiv} target='_blank' rel='noopener noreferrer'><img src="../bio/pixiv.png" alt="pixiv_bio" /></a>
            </div>
            ) : null
            }{bios.twitter ? bios.twitter.map(twitter =>
            <div>
                <a href={'https://twitter.com/' + twitter} target='_blank' rel='noopener noreferrer'><img src="../bio/twitter.png" alt='twitter_bio' /></a>
            </div>
            ) : null
            }{bios.adobe_portfolio ?
                <div>
                    <a href={"https://" + bios.adobe_portfolio + ".myportfolio.com"} target='_blank' rel='noopener noreferrer'><img src="../bio/adobe_portfolio.png" alt='adobe_portfolio_bio' /></a>
                </div>
                : null
            }{bios.fanbox ?
            <div>
                <a href={"https://" + bios.fanbox + ".fanbox.cc/"} target='_blank' rel='noopener noreferrer'><img src="../bio/fanbox.png" alt='fanbox_bio' /></a>
            </div>
            : null
            }{bios.tumblr ?
                <div>
                    <a href={"https://" + bios.tumblr + ".tumblr.com/"} target='_blank' rel='noopener noreferrer'><img src="../bio/tumblr.png" alt='tumblr_bio' /></a>
                </div>
            : null
            }{bios.pinterest ?
                <div>
                    <a href={"https://www.pinterest.jp/" + bios.pinterest} target='_blank' rel='noopener noreferrer'><img src="../bio/pinterest.png" alt='pinterest_bio' /></a>
                </div>
            : null
            }{bios.arcalive ?
                <div>
                    <a href={"https://arca.live/u/@" + bios.arcalive} target='_blank' rel='noopener noreferrer'><img src="../bio/arcalive.png" alt='arcalive_bio' /></a>
                </div>
            : null
            }{bios.htoh ?
                <div>
                    <a href={"https://htoh.asia/" + bios.htoh} target='_blank' rel='noopener noreferrer'><img src="../bio/htoh.png" alt='htoh_bio' /></a>
                </div>
            : null
            }{bios.artstation ?
                <div>
                    <a href={"https://www.artstation.com/" + bios.artstation} target='_blank' rel='noopener noreferrer'><img src="../bio/artstation.png" alt='artstation_bio' /></a>
                </div>
            : null
            }{bios.deviantart ?
                <div>
                    <a href={"https://www.deviantart.com/" + bios.deviantart} target='_blank' rel='noopener noreferrer'><img src="../bio/deviantart.png" alt='deviantart_bio' /></a>
                </div>
            : null
            }{bios.naver_blog ?
                <div>
                    <a href={"https://blog.naver.com/" + bios.naver_blog} target='_blank' rel='noopener noreferrer'><img src="../bio/naver_blog.png" alt='naver_blog_bio' /></a>
                </div>
            : null
            }{bios.naver_cafe ?
                <div>
                    <a href={"https://cafe.naver.com/" + bios.naver_cafe} target='_blank' rel='noopener noreferrer'><img src="../bio/naver_cafe.png" alt='naver_cafe_bio' /></a>
                </div>
            : null
            }{bios.formrun ?
                <div>
                    <a href={"https://form.run/@" + bios.skeb} target='_blank' rel='noopener noreferrer'><img src="../bio/formrun.png" alt='formrun_bio' /></a>
                </div>
            : null
            }{bios.skeb ?
                <div>
                    <a href={"https://skeb.jp/" + bios.skeb} target='_blank' rel='noopener noreferrer'><img src="../bio/skeb.png" alt='skeb_bio' /></a>
                </div>
            : null
            }{bios.plurk ?
                <div>
                    <a href={"https://www.plurk.com/" + bios.skeb} target='_blank' rel='noopener noreferrer'><img src="../bio/plurk.png" alt='plurk_bio' /></a>
                </div>
            : null
            }{bios.youtube ?
                <div>
                    <a href={"https://www.youtube.com/" + bios.youtube} target='_blank' rel='noopener noreferrer'><img src="../bio/youtube.png" alt='youtube_bio' /></a>
                </div>
            : null
            }{bios.chzzk ?
                <div>
                    <a href={"https://chzzk.naver.com/" + bios.chzzk} target='_blank' rel='noopener noreferrer'><img src="../bio/chzzk.png" alt='chzzk_bio' /></a>
                </div>
            : null
            }{bios.twitch ?
                <div>
                    <a href={"https://www.twitch.tv/" + bios.twitch} target='_blank' rel='noopener noreferrer'><img src="../bio/twitch.png" alt='twitch_bio' /></a>
                </div>
            : null
            }{bios.bilibili ?
                <div>
                    <a href={"https://space.bilibili.com/" + bios.bilibili} target='_blank' rel='noopener noreferrer'><img src="../bio/bilibili.png" alt='bilibili_bio' /></a>
                </div>
            : null
            }{bios.weibo ?
                <div>
                    <a href={"https://weibo.com/" + bios.weibo} target='_blank' rel='noopener noreferrer'><img src="../bio/weibo.png" alt='weibo_bio' /></a>
                </div>
            : null
            }{bios.facebook ?
                <div>
                    <a href={"https://www.facebook.com/" + bios.facebook} target='_blank' rel='noopener noreferrer'><img src="../bio/facebook.png" alt='facebook_bio' /></a>
                </div>
            : null
            }{bios.behance ?
                <div>
                    <a href={"https://www.behance.net/" + bios.behance} target='_blank' rel='noopener noreferrer'><img src="../bio/behance.png" alt='behance_bio' /></a>
                </div>
            : null
            }{bios.instagram ?
                <div>
                    <a href={"https://www.instagram.com/" + bios.instagram} target='_blank' rel='noopener noreferrer'><img src="../bio/instagram.png" alt='instagram_bio' /></a>
                </div>
            : null
            }{bios.threads ?
                <div>
                    <a href={"https://www.threads.net/@" + bios.threads} target='_blank' rel='noopener noreferrer'><img src="../bio/threads.png" alt='threads_bio' /></a>
                </div>
            : null
            }{bios.bluesky ?
                <div>
                    <a href={"https://bsky.app/profile/" + bios.bluesky + ".bsky.social"} target='_blank' rel='noopener noreferrer'><img src="../bio/bluesky.png" alt='bluesky_bio' /></a>
                </div>
            : null
            }{bios.misskey ?
                <div>
                    <a href={"https://misskey.io/@" + bios.bluesky} target='_blank' rel='noopener noreferrer'><img src="../bio/misskey.png" alt='misskey_bio' /></a>
                </div>
            : null
            }{bios.asked ?
                <div>
                    <a href={"https://asked.kr/" + bios.asked} target='_blank' rel='noopener noreferrer'><img src="../bio/asked.png" alt='asked_bio' /></a>
                </div>
            : null
            }{bios.giphy ?
                <div>
                    <a href={"https://giphy.com/" + bios.giphy} target='_blank' rel='noopener noreferrer'><img src="../bio/giphy.png" alt='giphy_bio' /></a>
                </div>
            : null
            }{bios.dlsite ?
                bios.dlsite.includes('maniax')?
                <div>
                    <a href={"https://www.dlsite.com/maniax/circle/profile/=/maker_id/" + bios.dlsite.split('/')[1] + ".html"} target='_blank' rel='noopener noreferrer'><img src="../bio/dlsite.png" alt='dlsite_bio' /></a>
                </div> :
                <div>
                    <a href={"https://www.dlsite.com/home/circle/profile/=/maker_id/" + bios.dlsite + ".html"} target='_blank' rel='noopener noreferrer'><img src="../bio/dlsite.png" alt='dlsite_bio' /></a>
                </div>
            : null
            }{bios.ci_en ?
                <div>
                    <a href={"https://ci-en.dlsite.com/creator/" + bios.ci_en} target='_blank' rel='noopener noreferrer'><img src="../bio/ci-en.png" alt='ci-en_bio' /></a>
                </div>
            : null
            }{bios.booth ?
                <div>
                    <a href={"https://" + bios.booth + ".booth.pm/"} target='_blank' rel='noopener noreferrer'><img src="../bio/booth.png" alt='booth_bio' /></a>
                </div>
            : null
            }{bios.patreon ?
                !isNaN(Number(bios.patreon)) ?
                <div>
                    <a href={"https://www.patreon.com/user?u=" + bios.patreon} target='_blank' rel='noopener noreferrer'><img src="../bio/patreon.png" alt='patreon_bio' /></a>
                </div>
                :
                <div>
                    <a href={"https://www.patreon.com/" + bios.patreon} target='_blank' rel='noopener noreferrer'><img src="../bio/patreon.png" alt='patreon_bio' /></a>
                </div>
            : null
            }{bios.gumroad ?
                <div>
                    <a href={"https://" + bios.gumroad + ".gumroad.com/"} target='_blank' rel='noopener noreferrer'><img src="../bio/gumroad.png" alt='gumroad_bio' /></a>
                </div>
            : null
            }{bios.fantia ?
                <div>
                    <a href={"https://fantia.jp/fanclubs/" + bios.fantia} target='_blank' rel='noopener noreferrer'><img src="../bio/fantia.png" alt='fantia_bio' /></a>
                </div>
            : null
            }{bios.ko_fi ?
                <div>
                    <a href={"https://fantia.jp/fanclubs/" + bios.ko_fi} target='_blank' rel='noopener noreferrer'><img src="../bio/ko-fi.png" alt='ko-fi_bio' /></a>
                </div>
            : null
            }{bios.subscribestar ?
                <div>
                    <a href={"https://subscribestar.adult/" + bios.subscribestar} target='_blank' rel='noopener noreferrer'><img src="../bio/subscribestar.png" alt='subscribestar_bio' /></a>
                </div>
            : null
            }{bios.skima ?
                <div>
                    <a href={"https://skima.jp/profile?id=" + bios.skima} target='_blank' rel='noopener noreferrer'><img src="../bio/skima.png" alt='skima_bio' /></a>
                </div>
            : null
            }{bios.penker ?
                <div>
                    <a href={"https://penker.tw/" + bios.penker} target='_blank' rel='noopener noreferrer'><img src="../bio/penker.png" alt='penker_bio' /></a>
                </div>
            : null
            }{bios.fanding ?
                <div>
                    <a href={"https://fanding.kr/@" + bios.fanding} target='_blank' rel='noopener noreferrer'><img src="../bio/fanding.png" alt='fanding_bio' /></a>
                </div>
            : null
            }{bios.foundation ?
                <div>
                    <a href={"https://foundation.app/@" + bios.foundation} target='_blank' rel='noopener noreferrer'><img src="../bio/foundation.png" alt='foundation_bio' /></a>
                </div>
            : null
            }{bios.vgen ?
                <div>
                    <a href={"https://vgen.co/" + bios.vgen} target='_blank' rel='noopener noreferrer'><img src="../bio/vgen.png" alt='vgen_bio' /></a>
                </div>
            : null
            }{bios.sketchmob ?
                <div>
                    <a href={"https://sketchmob.com/user-profile/" + bios.sketchmob} target='_blank' rel='noopener noreferrer'><img src="../bio/sketchmob.png" alt='sketchmob_bio' /></a>
                </div>
            : null
            }{bios.etsy ?
                <div>
                    <a href={"https://www.etsy.com/shop/" + bios.etsy} target='_blank' rel='noopener noreferrer'><img src="../bio/etsy.png" alt='etsy_bio' /></a>
                </div>
            : null
            }{bios.inprnt ?
                <div>
                    <a href={"https://www.inprnt.com/gallery/" + bios.inprnt} target='_blank' rel='noopener noreferrer'><img src="../bio/inprnt.png" alt='inprint_bio' /></a>
                </div>
            : null
            }{bios.artmug ?
                <div>
                    <a href={"https://artmug.kr/index.php?channel=list&field=brand&search=" + bios.artmug} target='_blank' rel='noopener noreferrer'><img src="../bio/artmug.png" alt='artmugt_bio' /></a>
                </div>
            : null
            }{bios.melonbooks ?
                <div>
                    <a href={"https://www.melonbooks.co.jp/circle/index.php?circle_id=" + bios.melonbooks} target='_blank' rel='noopener noreferrer'><img src="../bio/melonbooks.png" alt='melonbooks_bio' /></a>
                </div>
            : null
            }{bios.coloso ?
                <div>
                    <a href={"https://coloso.co.kr/products/" + bios.coloso} target='_blank' rel='noopener noreferrer'><img src="../bio/coloso.png" alt='coloso_bio' /></a>
                </div>
            : null
            }{bios.steam ?
                <div>
                    <a href={"https://store.steampowered.com/curator/" + bios.steam} target='_blank' rel='noopener noreferrer'><img src="../bio/steam.png" alt='steam_bio' /></a>
                </div>
            : null
            }{bios.redbubble ?
                <div>
                    <a href={"https://www.redbubble.com/people/" + bios.redbubble + "/shop"} target='_blank' rel='noopener noreferrer'><img src="../bio/redbubble.png" alt='redbubble_bio' /></a>
                </div>
            : null
            }{bios.imdb ?
                <div>
                    <a href={"https://www.imdb.com/name/" + bios.imdb} target='_blank' rel='noopener noreferrer'><img src="../bio/imdb.png" alt='imdb_bio' /></a>
                </div>
            : null
            }
        </div>
    )
}


export default Illustrator