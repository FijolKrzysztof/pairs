import React, { Component } from 'react';
import './App.css';
import {Container, Col, Row, Card, Navbar, Badge, ButtonGroup, Button} from 'react-bootstrap';

let id = [];
let pairs;
let difficulty = 0;
let min = 0;
let sec = '00';
let measureTime = false;
let clicked = null;
let proceed = true;
let firstClick = false;
let disabled = [];
let loaded = 0;

class App extends Component {
  handleLoading = () => {
    loaded ++;
    if(loaded === 24) document.getElementById('load').style.display = 'none';
  }

  setTime = () => {
    setTimeout(() => {
      if(measureTime === true){
        if(sec === 59){
          min ++;
          sec = 0;
        } else {
          sec ++;
        }
        if(sec < 10) sec = '0' + sec;
        this.setState({sec});
        this.setTime();
      }
    }, 1000);
  }

  handleClick = (e) => {
    let num = parseInt((e.target.id).slice(2), 10);
    if(proceed === true && disabled[num] === 0){
      proceed = false;
      if(firstClick === false){
        firstClick = true;
        measureTime = true;
        this.setTime();
      }
      document.getElementById('i-' + num).style.opacity = 1;
      if(clicked !== null){
        setTimeout(() => {
          if(id[num] !== id[clicked]){
            document.getElementById('i-' + num).style.opacity = 0;
            document.getElementById('i-' + clicked).style.opacity = 0;
          } else {
            disabled[num] = 1;
            disabled[clicked] = 1;
            pairs --;
          }
          if(pairs === 0){
            measureTime = false;
          } else {
            clicked = null;
            proceed = true;
          }
        }, 200);
      } else {
        clicked = num;
        proceed = true;
      }
    }
  }

  handleError = (e) => {
    proceed = false;
    let num = parseInt((e.target.id).slice(2), 10);
    let change;
    for(let i = 0; i < pairs*2; i ++){
      if(id[num] === id[i] && num !== i){
        change = i;
        break;
      }
    }
    let random = (Math.floor(Math.random() * 1000)) + 1;
    id[num] = random;
    id[change] = random;
    this.setState({id}, function(){});
    proceed = true;
  }

  generatePosition = () => {
    let freeSpaces = [];
    for(let i = 0; i < pairs*2; i ++){
      if(id[i] === 0) freeSpaces.push(i);
    }
    let position = Math.floor(Math.random() * freeSpaces.length);
    return freeSpaces[position];
  }

  setUp = () => {
    proceed = false;
    if(difficulty === 0){
      id = [0,0,0,0,0,0];
      disabled = [0,0,0,0,0,0];
      pairs = 3;
    }
    if(difficulty === 1){
      id = [0,0,0,0,0,0,0,0,0,0,0,0];
      disabled = [0,0,0,0,0,0,0,0,0,0,0,0];
      pairs = 6;
    }
    if(difficulty === 2){
      id = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      disabled = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      pairs = 12;
    }
    for(let i = 0; i < pairs; i ++){
      let random = (Math.floor(Math.random() * 1000)) + 1;
      id[this.generatePosition()] = random;
      id[this.generatePosition()] = random;
    }
    this.setState({id});
    proceed = true;
  }

  componentDidMount = () => {
    this.setUp();
  }

  render() { 
    let cl1;
    let cl2;
    let cl3;
    let hide2;
    let hide3;
    if(difficulty === 0){
      cl1 = 'lvl-0';
      cl2 = 'd-none';
      cl3 = 'd-none';
      hide2 = 'hide';
      hide3 = 'hide';
    }
    if(difficulty === 1){
      cl1 = 'lvl-1';
      cl2 = 'lvl-1';
      cl3 = 'd-none';
      hide2 = '';
      hide3 = 'hide';
    }
    if(difficulty === 2){
      cl1 = 'lvl-2';
      cl2 = 'lvl-2';
      cl3 = 'lvl-2';
      hide2 = '';
      hide3 = '';
    }
    return ( 
      <div className="App">
        <header className="App-header">
          <Navbar className="fixed-top bg-dark justify-content-center">
            <Col>
              <Badge>Difficulty:</Badge>
              <ButtonGroup className="btn-group-lg">
                <Button onClick={(e) => this.changeDifficulty(e)} variant="danger">1</Button>
                <Button onClick={(e) => this.changeDifficulty(e)} variant="danger">2</Button>
                <Button onClick={(e) => this.changeDifficulty(e)} variant="danger">3</Button>
              </ButtonGroup>
            </Col>
            <Col className="align-self-end">
              <h1><Badge variant="secondary">{min + ':' + sec}</Badge></h1>
            </Col>
            <Col></Col>
          </Navbar>
          <Container>
            <Row id="row" className="justify-content-center">
              <Card className={cl1}>
                <Card.Img id="i-0" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[0] + "/300/450"} />
              </Card>
              <Card className={cl1}>
                <Card.Img id="i-1" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[1] + "/300/450"} />
              </Card>
              <Card className={cl1}>
                <Card.Img id="i-2" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[2] + "/300/450"} />
              </Card>
              <Card className={cl1}>
                <Card.Img id="i-3" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[3] + "/300/450"} />
              </Card>
              <Card className={cl1}>
                <Card.Img id="i-4" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[4] + "/300/450"} />
              </Card>
              <Card className={cl1}>
                <Card.Img id="i-5" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[5] + "/300/450"} />
              </Card>

              <Card className={cl2}>
                <Card.Img className={hide2} id="i-6" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[6] + "/300/450"} />
              </Card>
              <Card className={cl2}>
                <Card.Img className={hide2} id="i-7" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[7] + "/300/450"} />
              </Card>
              <Card className={cl2}>
                <Card.Img className={hide2} id="i-8" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[8] + "/300/450"} />
              </Card>
              <Card className={cl2}>
                <Card.Img className={hide2} id="i-9" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[9] + "/300/450"} />
              </Card>
              <Card className={cl2}>
                <Card.Img className={hide2} id="i-10" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[10] + "/300/450"} />
              </Card>
              <Card className={cl2}>
                <Card.Img className={hide2} id="i-11" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[11] + "/300/450"} />
              </Card>

              <Card className={cl3}>
                <Card.Img className={hide3} id="i-12" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[12] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-13" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[13] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-14" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[14] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-15" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[15] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-16" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[16] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-17" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[17] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-18" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[18] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-19" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[19] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-20" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[20] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-21" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[21] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-22" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[22] + "/300/450"} />
              </Card>
              <Card className={cl3}>
                <Card.Img className={hide3} id="i-23" onLoad={this.handleLoading} onError={(e) => this.handleError(e)} onClick={(e) => this.handleClick(e)} style={{opacity: 0}} src={"https://picsum.photos/id/" + id[23] + "/300/450"} />
              </Card>
            </Row>
          </Container>
        </header>
      </div>
     );
  }

  changeDifficulty = (e) => {
    proceed = false;
    measureTime = false;
    loaded = 0;
    document.getElementById('load').style.display = 'block';
    let num = parseInt(e.target.innerHTML);
    if(num === 1) difficulty = 0;
    if(num === 2) difficulty = 1;
    if(num === 3) difficulty = 2;
    this.setState({difficulty});
    for(let i = 0; i < 24; i ++) document.getElementById('i-' + i).style.opacity = 0;
    this.setUp();
    firstClick = false;
    min = 0;
    sec = '00';
    this.setState({sec});
  }
}
 
export default App;
