import Axios from 'axios'

export const initializeFeats = (setFeats, setLoadedFeat, seed) => {
    Axios.get(
        'https://api.github.com/repos/foundryvtt/pf2e/git/trees/master?recursive=1'
      ).then(
          res => res.data.tree.filter((d) => {
              return d.path.startsWith('packs/feats/')
          }).map((d) => {
              return d.path.slice(12, -5)
          })  
      ).then(
        res => {
          console.log(res)
          const chosenFeat = res[Math.floor(seed*res.length)]
          console.log(chosenFeat)
          setFeats(res.map((d, index) => {
            return {
              id: index,
              name: d
            }
          }))
          getInitialFeat(setLoadedFeat, chosenFeat, seed, res) 
        }
      ) 
}

function getInitialFeat(setLoadedFeat, chosenFeat, seed, ogRes) {
  Axios.get(  
    'https://raw.githubusercontent.com/foundryvtt/pf2e/master/packs/feats/'+chosenFeat+'.json'
    ).then(
      res => {
        if(res.data.system.level.value === 0) {
          const newChosenFeat = ogRes[Math.floor(seed*res.length/2)]
          getInitialFeat(setLoadedFeat, newChosenFeat, seed, ogRes)
        } else {
          return setLoadedFeat([true, {
              name: res.data.name,
              action: res.data.system.actions.value ? res.data.system.actions.value+' '+res.data.system.actionType.value : res.data.system.actionType.value,
              category: res.data.system.category,
              level: res.data.system.level.value,
              rarity: res.data.system.traits.rarity,
              traits: res.data.system.traits.value,
              prereqs: res.data.system.prerequisites.value,
              source: res.data.system.publication.title
            }])
        }
        
      }
    )
}


export const compareGuessAndCheckSolved = (res, setSolved, loadedFeat) => {
    setSolved(res.data.name === loadedFeat.name)
    return {
      name: res.data.name,
      action: res.data.system.actions.value ? res.data.system.actions.value+' '+res.data.system.actionType.value : res.data.system.actionType.value,
      category: res.data.system.category,
      level: res.data.system.level.value,
      rarity: res.data.system.traits.rarity,
      traits: res.data.system.traits.value,
      nameColor: res.data.name === loadedFeat.name ? 'limegreen' : 'crimson',
      actionColor: (res.data.system.actions.value ? res.data.system.actions.value+' '+res.data.system.actionType.value : res.data.system.actionType.value) === loadedFeat.action ? 'limegreen' : 'crimson',
      categoryColor: res.data.system.category === loadedFeat.category ? 'limegreen' : 'crimson',
      levelColor: res.data.system.level.value === loadedFeat.level ? 'limegreen' : 'crimson',
      levelArrow: compareLevels(res.data.system.level.value, loadedFeat.level),
      rarityColor: res.data.system.traits.rarity === loadedFeat.rarity ? 'limegreen' : 'crimson',
      traitsColor: compareTraits(res.data.system.traits.value, loadedFeat.traits),
    }
}

const compareLevels = (levelRes, levelLoaded) => {
    if(levelRes > levelLoaded) {
      return 'url(' + require('./icons/arrowIconRedDown.png') + ')'
    }
    if(levelRes < levelLoaded) {
      return 'url(' + require('./icons/arrowIconRedUp.png') + ')'
    }
    return ""
}

const compareTraits = (traitsOne, traitsTwo) => {
    const identicalCheck = 
      traitsOne.every(trait => traitsTwo.includes(trait))
      && 
      traitsTwo.every(item => traitsOne.includes(item))
    if (identicalCheck) {
      return 'limegreen'
    }
    const similarCheck = traitsOne.some(trait => traitsTwo.includes(trait))
    if (similarCheck) {
      return 'orange'
    }
    return 'crimson'
}