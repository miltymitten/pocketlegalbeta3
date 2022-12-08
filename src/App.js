import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});

  const handleSearch = async () => {

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

  // keeps track of the search variable and runs handleSearch when search is updated
  useEffect(() => {
    handleSearch()
    }, [search]);

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

          {/* <input 
            type="button" 
            value="Jury"
            placeholder="what are you looking for?"
            //value = {search}
            // onChange={e=>setSearch(e.target.value)}
          /> 

          <input 
            type="button" 
            value="Lawyer"
            placeholder="what are you looking for?"
            //value = {search}
            // onChange={e=>setSearch(e.target.value)}
          />  */}

        </form>
       
        {(searchInfo.totalhits)? <p>Search Result:{searchInfo.totalhits} </p>:''}
      </header>

      <div className="results">
        {result.map((result,i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`; 

          return(
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML= {{__html: result.snippet}}>
              
              </p>
              <a href={url} target="_blank" rel='noreferrer'>Read More</a>
            </div>
          )
        })}
        
      </div>
    </div>
    </Col>
    </Row>
  </Container>
  );
}



export default App;
