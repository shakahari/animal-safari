import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress';
import './Timer.css'
import endGame from '../actions/games/end'

class Timer extends PureComponent {
  constructor() {
    super();
    this.state = { time: 25 };
    this.timer = 0;
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (this.props.currentGame.started === false && nextProps.currentGame.started === true)
      this.startTimer()
    else if (this.props.currentGame.started === true && nextProps.currentGame.started === false)
      this.setState({ time: 25 })
    else if (nextProps.currentGame.ended === true)
      clearInterval(this.timer)
  }

  startTimer() {
      this.timer = setInterval(this.countDown.bind(this), 1000)
  }

  countDown() {
    const gameId = this.props.currentGame._id
    let seconds = this.state.time - 1;

    if (seconds < 1) {
      clearInterval(this.timer);
      this.props.endGame(gameId)
    }

    this.setState({
      time: seconds,
    });

  }

  render() {
    const style = {
      position: "relative",
      top: "-71px",
      left: "-1px"
    };
    return (
      <div className="Timer">
        <h1> {this.state.time} </h1>
        <CircularProgress
          id="circular progress"
          style={style}
          max={25}
          mode="determinate"
          size={60}
          value={this.state.time}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentGame }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]

  return {
    game,
    games,
    currentGame,
  }
}

export default connect(mapStateToProps, { endGame })(Timer)
