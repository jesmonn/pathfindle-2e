import './App.css';
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { initializeFeats, compareGuessAndCheckSolved } from './getFeats'
import { logoTextStyle, flexHeader, basicTextStyle, basicTextStyleBold, titleTextStyleBold } from './styles';
import { Feat } from './Feat';

export const Unlimited = () => {
  const [solved, setSolved] = useState(false);
  const [feats, setFeats] = useState([{}]);
  const [loadedFeat, setLoadedFeat] = useState([false, {}]);
  const [guessList, setGuessList] = useState([]);
  const [guessFilenames, setGuessFilenames] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    initializeFeats(setFeats, setLoadedFeat, Math.random())
  }, [])

  const addGuess = (guessName) => {
    if (guessFilenames.includes(guessName)){
      return
    }
    Axios.get(  
      'https://raw.githubusercontent.com/foundryvtt/pf2e/master/packs/feats/'+guessName+'.json'
      ).then(
        res => setGuessList([compareGuess(res), ...guessList])
      )
    setFeats(feats.filter(feat => feat.name !== guessName))
    setGuessFilenames([...guessFilenames, guessName])
  }

  const compareGuess = (res) => {
    return compareGuessAndCheckSolved(res, setSolved, loadedFeat[1])
  }

  const handleOnSearch = (string, results) => {
    setSearchString(string);
  };

  const handleOnSelect = (item) => {
    addGuess(item.name)
    setSearchString("")
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left', textTransform: 'capitalize' }}>{item.name.replace(/-/g, ' ')}</span>
      </>
    )
  }

  return (
    <div className="App">
      <div> - </div>
      <h1 style={logoTextStyle}>PATHFINDLE2E</h1>
      <p style={basicTextStyle}>The Unlimited/Endless mode, which changes every time you load the page.<br></br>Guess the feat - all feats are included! Note: everything will be reset if you reload the page!</p>
      {!loadedFeat[0] && <h1 style={titleTextStyleBold}>Loading...</h1>}
      {loadedFeat[0] && <div style={{marginBottom: 40}}>
        <div className="addGuess" style={
          {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            width: '50vw' 
          }
        }>
          {!solved && <div style={{animation: 'fade-in 1.2s'}}><ReactSearchAutocomplete
              items={feats}
              onSelect={handleOnSelect}
              showIcon={false}
              autoFocus
              formatResult={formatResult}
              onSearch={handleOnSearch}
              inputSearchString={searchString}
              styling={
                {
                  borderRadius: '4px',
                }
              }
            />
            <div style={{marginTop: 15}}/>
            {!(guessList.length > 3) && <div style={basicTextStyle}>Hint 1, the Sourcebook, will reveal itself after 4 guesses.</div>}
            {guessList.length > 3 && <div style={basicTextStyle}>Hint 1: The Sourcebook is '{loadedFeat[1].source}'.</div>}
            
            {!(guessList.length > 7) && <div style={basicTextStyle}>Hint 2, the first and last letter of the feat's name, will reveal itself after 8 guesses.</div>}
            {guessList.length > 7 && <div style={basicTextStyle}>Hint 2: The first letter of the feat's name: '{loadedFeat[1].name[0]}'. The last letter of the feat's name: '{loadedFeat[1].name[loadedFeat[1].name.length-1]}'.</div>}
            
            {(loadedFeat[1].prereqs.length > 0) &&
            <div> 
              {!(guessList.length > 12) && <div style={basicTextStyle}>Hint 3, the feat's prerequisites, will reveal itself after 13 guesses.</div>}
              {guessList.length > 12 && <div style={basicTextStyle}>Hint 3: the prerequisites: {(loadedFeat[1].prereqs.map((req) => req.value).join(", "))}.</div>}
            </div> }

            {(loadedFeat[1].prereqs.length <= 0) &&
            <div> 
              {!(guessList.length > 12) && <div style={basicTextStyle}>Hint 3, some (half or so) of the feat's traits (or all, if it only has 1 or none), will reveal itself after 13 guesses.</div>}
              {guessList.length > 12 && <div style={basicTextStyle}>Hint 3: some of the traits: {(loadedFeat[1].traits.slice(0, Math.ceil(loadedFeat[1].traits.length/2)).join(", "))}.</div>}
            </div> }

            {!(guessList.length > 18) && <div style={basicTextStyle}>Hint 4, the two foremost and two last letters of the feat's name, will reveal itself after 19 guesses.</div>}
            {guessList.length > 18 && <div style={basicTextStyle}>Hint 4: The two foremost letter of the feat's name: '{loadedFeat[1].name.slice(0, 2)}'. The last two letters of the feat's name: '{loadedFeat[1].name.slice(-2)}'.</div>}
            
            
            
            </div>}
          {solved && <h2 style={basicTextStyle}>
            You found the feat in <b>{guessList.length}</b> guess(es)! 
            </h2>
            }
        </div>
        <div className="list" style={{
          marginTop: 20,
          height: '100vw',
          animation: 'fade-in 1.2s'
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'center',
            marginLeft: '20vw',
            marginRight: '20vw',
            borderBottom: '2px solid white'
          }}>
            <div style={flexHeader(2)}>
              <p style={basicTextStyleBold}>
                Feat Name
              </p>
            </div>
            <div style={flexHeader(1.2)}>
              <p style={basicTextStyleBold}>
                Actions
              </p>
            </div>
            <div style={flexHeader(1.2)}>
              <p style={basicTextStyleBold}>
                Category
              </p>
            </div>
            <div style={flexHeader(0.8)}>
              <p style={basicTextStyleBold}>
                Level
              </p>
            </div>
            <div style={flexHeader(1.5)}>
              <p style={basicTextStyleBold}>
                Rarity
              </p>
            </div>
            <div style={flexHeader(2)}>
              <p style={basicTextStyleBold}>
                Traits
              </p>
            </div>

          </div>
          {guessList.length>0 && <Feat
              guessFeat={guessList[0]}
              key={guessList[0].name}
              className='feat'
            />}
          {[...guessList].slice(1).map((guess) => {
            return <Feat
              guessFeat={guess}
              className=''
            />;
          })}
          <div style={{marginTop: 20, marginBottom: 10}}></div>
          <p style={basicTextStyle}><b>This website</b> uses trademarks and/or copyrights owned by Paizo Inc., used under Paizo's Community Use Policy (<a href="http://paizo.com/communityuse">paizo.com/communityuse</a>). We are expressly prohibited from charging you to use or access this content. <b>This website</b> is not published, endorsed, or specifically approved by Paizo. For more information about Paizo Inc. and Paizo products, visit <a href="http://paizo.com/">paizo.com</a>.</p>
          </div>
          
      </div>
      }
    
    </div>
  );
}