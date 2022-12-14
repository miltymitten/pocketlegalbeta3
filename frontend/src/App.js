import { useEffect, useState } from 'react';
// BroswerRouter: Wrap any component or code that nedds to use the router
// Routes: Contains all the routes we want to use
// Route: Component to create single route
// import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { Body } from 'react-bootstrap/lib/Media';

function App() {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [ytresult, setYtResults] = useState([]);
  const [videosearch, setVideoSearch] = useState(true);
  const [videoToggle, setVideoToggle] = useState();
  const [googleresult, setGoogleResults] = useState([]);

  // fetches data from Wikipedia using the pre-defined search term
  const handlewikiSearch = async () => {

    if (search ==='') return;
    
    const endpoint =`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${search}`;
    
    const response = await fetch(endpoint);

    if (!response.ok){
      throw Error(response.statusText)

    }
    const json = await response.json();

    setResults(json.query.search)
    setSearchInfo(json.query.searchinfo);
  }

  // fetches data from YouTube using the pre-defined search term
  const handleyoutubeSearch = async() => {
    if (search ==='') return;

    const youtube_api_key = 'AIzaSyDz8bGB5uV2VqmNiuLoel23mV3t4F8rs8E'

    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${search}&key=${youtube_api_key}`

    const response = await fetch(endpoint);

    if (!response.ok){
      throw Error(response.statusText)

    }

    const json = await response.json()
    setYtResults(json.items)
  }

  // fetches data from Google using the pre-defined search term
  const handlegoogleSearch = async() => {
    if (search ==='') return;

    const API_KEY = 'AIzaSyDz8bGB5uV2VqmNiuLoel23mV3t4F8rs8E'
    const CONTEXT_KEY = '1237e94b63fde4acc'

    const endpoint = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${search}`

    const response = await fetch(endpoint);

    if (!response.ok){
      throw Error(response.statusText)
    }
    const json = await response.json()
    setGoogleResults(json.items)

  }

  // keeps track of the search variable and runs handleSearch methods when search is updated

  useEffect(() => {
    if (videosearch === true) {
      handlewikiSearch();
      handleyoutubeSearch();
      handlegoogleSearch();
    }
    else {
      handlewikiSearch();
      handlegoogleSearch();
    }
    }, [search]);

    // keepts track of whether video search is on or off
    useEffect(() => {
      if (videosearch === true) {
      setVideoToggle("Video search is on")
      }
      else {
        setVideoToggle("Video search is off")
      }
    }, [videosearch])

    // updates the click metric in the database whenever the search term is updated
    useEffect(() => {
      if (search === '') {
        return;
      };
      const searchterm = `/api/metrics/${search}`
      const updateClickCount = async () => {
        const response = await fetch(searchterm, {
          method: 'PATCH',
          body: {},
          headers: {
            'Content-Type': 'text/html'
          }
        })
        const json = await response.json()
        
        if (response.ok) {
          // console.log(json)
          // console.log("counter updated")
         }
    }
    updateClickCount()
    }, [search])

  return (
    
    // Nav bar components
    <Container fluid="md">
    <Row>
      <Col>
    <div className="App">
      <div className='Nav'>
      <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Pocket Legal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="https://github.com/miltymitten/pocketlegalbeta3" target="_blank">About Us</Nav.Link>
        </Nav.Item>
      </Nav>
      </div>
        <header>
          <br></br>
          <h1>Legal Wiki Seeker</h1>
          {/* button for toggling video search on or off. commenting out because its for testing purposes. if this method needs to be used, also set the default value of videosearch to False in the useState hook*/}
          {/* <ToggleButton
          className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={videosearch}
            onChange={(e) => setVideoSearch(e.currentTarget.checked)}>
              {videoToggle}
          </ToggleButton>  */}

          {/* buttons with pre-dfined search terms  */}
          <form onClick={e => setSearch(e.target.value)}> 
    
            <Button
              className = "search-button"
              variant = "primary"
              value="Voir dire"
              type="button" 
              placeholder="what are you looking for?"
              >Voir dire
              </Button> 
            
            {' '}

            <Button
            variant = "primary"
            value="Litigation"
            type="button" 
            placeholder="what are you looking for?"
            >Litigation
            </Button> 

            {' '}

            <Button
            variant = "primary"
            value='\"Structured Settlement\"'
            type="button" 
            placeholder="what are you looking for?"
            >Structured Settlement
            </Button> 

          </form>
        
          {/* returns number of search results from Wikipedia */}
          {(searchInfo.totalhits)? <p><br></br>Search results on Wikipedia:{searchInfo.totalhits} </p>:''}
        </header>

        {(searchInfo.totalhits)?
        
        <div className="result">
          <div className="endpoint-results">
            <div className="wiki-results">
            {result.map((result,i) => {
              const url = `https://en.wikipedia.org/?curid=${result.pageid}`; 

              return(
                <div key={i}>
                  <h3>{result.title}</h3>
                  <p dangerouslySetInnerHTML= {{__html: result.snippet}}>
                  </p>
                  <Button href={url} target="_blank" variant="secondary" size="sm">Read More
                  </Button>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              )
            })}
            </div>

            {(googleresult.length)? <h3>Top {googleresult.slice(0,3).length} results from Google</h3> : ''}

            <div className="google-results">
            {googleresult.slice(0,3).map((googleresult,i) => {

              return(
                <div key={i}>
                  <p><a class = 'reg' href={googleresult.link} target="_blank" rel='noreferrer'>{googleresult.title}</a></p>
                  <p dangerouslySetInnerHTML= {{__html: googleresult.snippet}}>
                  
                  </p>
                </div>
              )
            })}
            </div>
          </div>

          <div className="endpoint-results">
            <div className="video-container">
            {ytresult.map((ytresult,i) => {
              const url = `https://www.youtube.com/embed/${ytresult.id.videoId}`;
              return(
                // the video titles and the videos themselves are in separate divs so tha they don't overlap
                <div>
                  <div>
                    <p className="video-title">
                      {/* dangerouslySetInnerHTML is necessary to decode symbols (e.g. &.,'"!@") */}
                      <small dangerouslySetInnerHTML= {{__html: ytresult.snippet.title}}>
                        
                      </small></p>
                  </div>
                  <div className="videos" key={i}>
                    <iframe class="video" src={url}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                    />
                  </div>
                </div>
              )
            })}
            </div>
          </div>

        </div>
        : ' ' }
    </div>
    </Col>
    </Row>
  </Container>
  );
}

export default App;
