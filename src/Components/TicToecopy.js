import React, { useState } from 'react'
import './TicToecopy.css'
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import img from './others/animation_llvrb5xm_small.gif'
import sound from './others/gameover.mp3'

let OWins = 0;
let XWins = 0;
let draw = 0;

function TicToecopy() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [move, setMove] = useState("X")
  const [win, setWin] = useState("")
  const [clickprev, setClickprev] = useState(false);


  const clickHandler = (index) => {
    const copyarr = [...board];


    if (board[index] !== '') {
      // alert('Already Clicked');
      return
    }


    if (clickprev == false) {

      copyarr[index] = move;
      setBoard(copyarr);
      setMove(move == "X" ? "O" : "X")

      if (copyarr[0] == 'X' && copyarr[1] == 'X' && copyarr[2] == 'X' ||
        copyarr[3] == 'X' && copyarr[4] == 'X' && copyarr[5] == 'X' ||
        copyarr[6] == 'X' && copyarr[7] == 'X' && copyarr[8] == 'X' ||
        copyarr[0] == 'X' && copyarr[3] == 'X' && copyarr[6] == 'X' ||
        copyarr[1] == 'X' && copyarr[4] == 'X' && copyarr[7] == 'X' ||
        copyarr[2] == 'X' && copyarr[5] == 'X' && copyarr[8] == 'X' ||
        copyarr[0] == 'X' && copyarr[4] == 'X' && copyarr[8] == 'X' ||
        copyarr[2] == 'X' && copyarr[4] == 'X' && copyarr[6] == 'X') {
        setClickprev(true);
        setWin("X Won the Game")
        new Audio(sound).play()
        XWins++;
      }

      else if (copyarr[0] == 'O' && copyarr[1] == 'O' && copyarr[2] == 'O' ||
        copyarr[3] == 'O' && copyarr[4] == 'O' && copyarr[5] == 'O' ||
        copyarr[6] == 'O' && copyarr[7] == 'O' && copyarr[8] == 'O' ||
        copyarr[0] == 'O' && copyarr[3] == 'O' && copyarr[6] == 'O' ||
        copyarr[1] == 'O' && copyarr[4] == 'O' && copyarr[7] == 'O' ||
        copyarr[2] == 'O' && copyarr[5] == 'O' && copyarr[8] == 'O' ||
        copyarr[0] == 'O' && copyarr[4] == 'O' && copyarr[8] == 'O' ||
        copyarr[2] == 'O' && copyarr[4] == 'O' && copyarr[6] == 'O') {
        setClickprev(true);
        setWin("O Won the Game")
        new Audio(sound).play()
        OWins++;
      }

      else {
        if(copyarr.every((el) => el !== '')) {
          setClickprev(true);
          setWin("The Game is Draw")
          new Audio(sound).play()
          draw++;
        }
      }

    }
  }

  const reset = () => {
    setBoard(Array(9).fill(''))
    setMove("X");
    setWin("")
    setClickprev(false);
    OWins = 0;
    XWins = 0;
    draw = 0;
  }

  const playagain = () => {
    setBoard(Array(9).fill(''))
    setMove("X");
    setWin("")
    setClickprev(false);
  }

  return (
    <>
      <div className='container position-relative'>
        <h1 className='text-center'>Tic Tac Toe</h1>
        {move == "X" ?
          <div className='score'>
            <div className='lineRed'> X - {XWins}</div>
            <div>O - {OWins}</div>
            <div>Tie - {draw}</div>
          </div>
          :
          <div className='score'>
            <div>X - {XWins}</div>
            <div className='lineGreen'> O - {OWins}</div>
            <div>Tie - {draw}</div>
          </div>
        }

        <div className='tictactoe'>
          {
            board.map((el, index) => {
              return <Button variant='outlined' color='info' className={el === 'X' ? 'red btnn' : 'green btnn'} onClick={() => clickHandler(index)}>{el}</Button>
            })
          }
        </div>

        {
          clickprev ?
            <div className='resultmsg'>
              <h2 className=''>{win}</h2>
              <Button className='mt-3' variant="contained" color='warning' onClick={playagain} endIcon={<ReplayIcon />}>Play again</Button>
              <img src={img} alt="" width={100} style={{ marginTop: "20px" }} />
            </div> : null
        }

        <div className='text-center'>
          <Button variant='contained' className=' resetbtn' color='info' onClick={reset} endIcon={<RotateLeftRoundedIcon />}>reset</Button>
        </div>

      </div>
    </>
  )
}

export default TicToecopy

