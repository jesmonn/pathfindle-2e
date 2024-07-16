import { flexFeat, basicTextStyle } from "./styles"

export const Feat = (props) => {
    return <div style={{
      display: 'flex',
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
      justifyContent: 'center',
      marginLeft: '20vw',
      marginRight: '20vw',
      minHeight: 50,
    }} className={props.className}>
      <div style={flexFeat(2, props.guessFeat.nameColor)}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.name).slice(1, -1)}
        </p>
      </div>
      <div style={flexFeat(1.2, props.guessFeat.actionColor)}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.action).slice(1, -1)}
        </p>
      </div>
      <div style={flexFeat(1.2, props.guessFeat.categoryColor)}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.category).slice(1, -1)}
        </p>
      </div>
      <div style={{
        ...flexFeat(0.8, props.guessFeat.levelColor),
        backgroundImage: props.guessFeat.levelArrow,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.level)}
        </p>
      </div>
      <div style={flexFeat(1.5, props.guessFeat.rarityColor)}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.rarity).slice(1, -1)}
        </p>
      </div>
      <div style={flexFeat(2, props.guessFeat.traitsColor)}>
        <p style={basicTextStyle}>
          {JSON.stringify(props.guessFeat.traits.join(', ')).slice(1, -1).replace(/-/g, ' ')}
        </p>
      </div>
  
    </div>
  }