/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'
import EmojiCard from '../EmojiCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    topScore: 0,
    isGameIsInProgress: true,
    clickedEmojiList: [],
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameIsInProgress: true})
  }

  renderScoreCard = () => {
    const {emojiList} = this.props
    const {clickedEmojiList} = this.state
    const isWon = clickedEmojiList.length === emojiList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let updatedTopScore = topScore
    if (currentScore > topScore) {
      updatedTopScore = currentScore
    }
    this.setState({topScore: updatedTopScore, isGameIsInProgress: false})
  }

  clickEmoji = id => {
    const {emojiList} = this.props
    const {clickedEmojiList} = this.import
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojiList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojiList.length)
      }
      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  getShuffledEmojiList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojiList = () => {
    const shuffledEmojiList = this.getShuffledEmojiList

    return (
      <ul className="emojis-list-container">
        {shuffledEmojiList.map(eachEmoji => (
          <EmojiCard
            key={eachEmoji.id}
            eachEmojiDetails={eachEmoji}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {topScore, isGameIsInProgress, clickedEmojiList} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojiList.length}
          isGameIsInProgress={isGameIsInProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameIsInProgress ? this.renderEmojiList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
