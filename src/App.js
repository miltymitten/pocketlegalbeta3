import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [ytresult, setYtResults] = useState([]);
  const [videosearch, setVideoSearch] = useState(false);
  const [videoToggle, setVideoToggle] = useState();
  const [googleresult, setGoogleResults] = useState([]);

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
    console.log(json.items)
  }

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
    console.log(json.items)

  }

  // keeps track of the search variable and runs handleSearch when search is updated
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

    useEffect(() => {
      if (videosearch === true) {
      setVideoToggle("Video search is on")
      }
      else {
        setVideoToggle("Video search is off")
      }
    }, [videosearch])

  return (

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
        <Nav.Link href="https://github.com/miltymitten/pocketlegal-mernwebapp" target="_blank">About Us</Nav.Link>
      </Nav.Item>
    </Nav>
      </div>

      <header>
        <h1>Legal Wiki Seeker</h1>
        <ToggleButton
        className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={videosearch}
          onChange={(e) => setVideoSearch(e.currentTarget.checked)}>
            {videoToggle}
        </ToggleButton> 

        <form onClick={e => setSearch(e.target.value)}> 
  
          <Button
            variant = "secondary"
            value="Judge"
            type="button" 
            placeholder="what are you looking for?"
            >Judge
            </Button> 

          <Button
          variant = "secondary"
          value="Jury"
          type="button" 
          placeholder="what are you looking for?"
          >Jury
          </Button> 

          <Button
          variant = "secondary"
          value="Lawyer"
          type="button" 
          placeholder="what are you looking for?"
          >Lawyer
          </Button> 

        </form>
       
        {(searchInfo.totalhits)? <p><br></br>Search results on Wikipedia:{searchInfo.totalhits} </p>:''}
      </header>

      {(searchInfo.totalhits)?
      
      <div className="result">

        <div className="non-video-results">
        <div className="wiki-results">
        {result.map((result,i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`; 

          return(
            <div key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML= {{__html: result.snippet}}>
              
              </p>
              <a href={url} target="_blank" rel='noreferrer'>Read More</a>
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

        <div className="video-results">
        <div className="video-container">
        {ytresult.map((ytresult,i) => {
          const url = `https://www.youtube.com/embed/${ytresult.id.videoId}`;
          return(
            <div className="videos" key={i}>
              <iframe class="video" src={url}
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              />
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
