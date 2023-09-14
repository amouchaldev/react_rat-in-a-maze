import { useState, useEffect } from "react";
import "./App.css";
import rat from "../public/images/rat.png";
import food from "../public/images/food.png";

function App() {
  const levels = [[
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [2, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 3],
  ], 
  [
    [2, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 3, 1],
    [1, 0, 1, 1, 0, 1, 1],
  ],
  [
    [0, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [2, 1, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 3, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 1, 0, 0],
  ]
];
  const [timer, setTimer] = useState(10);
  const [levelCount, setLevelCount] = useState(0);
  const [ratPosition, setRatPosition] = useState([-1, -1]);
  const [level, setLevel] = useState(levels[levelCount]);
  const [timerInterval, setTimerInterval] = useState()
useEffect(() => {
  // initTimer()
  console.log('t : ', timer)
  setInterval(() => {
    // if(timer === 0) initTimer()
    setTimer(prev => --prev)
  }, 1000)
}, [])

function initTimer() {
  console.log('init timer: ', level)
  // setTimer(prev => (levels[levelCount].length * levels[levelCount][0].length) / 2)
  setTimer(prev => (level.length * level[0].length) / 2)
}

useEffect(() => {
  if(timer === 0) {
    initTimer()
    setLevel(prev => levels[levelCount])
  }
}, [timer])

  useEffect(() => {
    updateRatPosition()
    initTimer()
 
  }, [level]);
  
  useEffect(() => {
    if(levelCount <= levels.length - 1) setLevel(levels[levelCount])
    else setLevelCount(0)
    // console.log(level)
  }, [levelCount]);
  
// function changeLevel() {
//   if()

// }
  function updateRatPosition() {
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level[i].length; j++) {
        if(level[i][j] === 2) {
          setRatPosition(currentPosition => [i, j])
        break
      } 
    }
  }
}

useEffect(() => {
  document.addEventListener("keydown", handleKeyDown);
  // Clean up the event listener when the component unmounts
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [ratPosition])

function handleKeyDown(e) {

  if (e.key === "ArrowUp") {
    if(level[ratPosition[0] - 1] && [1, 3].includes(level[ratPosition[0] - 1][ratPosition[1]])) {
    if(level[ratPosition[0] - 1][ratPosition[1]] === 3) {
      setTimeout(() => {
        alert('wowwwwwwwwwww')
        setLevelCount(prev => ++prev)
      }, 500)
    }
    setLevel(prevState => {
      prevState[ratPosition[0]][ratPosition[1]] = 1
      prevState[ratPosition[0] - 1][ratPosition[1]] = 2
      return [...prevState]
  })
    }
  }
  if (e.key === "ArrowRight") {
    if(level[ratPosition[0]][ratPosition[1] + 1] && [1, 3].includes(level[ratPosition[0]][ratPosition[1] + 1])) {
      if(level[ratPosition[0]][ratPosition[1] + 1] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
        }, 500)
      }
      setLevel(prevState => {
        prevState[ratPosition[0]][ratPosition[1]] = 1
        prevState[ratPosition[0]][ratPosition[1] + 1] = 2
        return [...prevState]
    })
  }
}
  if (e.key === "ArrowDown") {
    if(level[ratPosition[0] + 1] && [1, 3].includes(level[ratPosition[0] + 1][ratPosition[1]])) {
      if(level[ratPosition[0] + 1][ratPosition[1]] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
        }, 500)
      }
      setLevel(prevState => {
          prevState[ratPosition[0]][ratPosition[1]] = 1
          prevState[ratPosition[0] + 1][ratPosition[1]] = 2
          return [...prevState]
      })
    }
  }
  if (e.key === "ArrowLeft") {
    if(level[ratPosition[0]][ratPosition[1] - 1] && [1, 3].includes(level[ratPosition[0]][ratPosition[1] - 1])) {
      if(level[ratPosition[0]][ratPosition[1] - 1] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
        }, 500)
      }
      setLevel(prevState => {
        prevState[ratPosition[0]][ratPosition[1]] = 1
        prevState[ratPosition[0]][ratPosition[1] - 1] = 2
        return [...prevState]
    })
  }
  }
}

  return (
    <div className="app">
      <h1>Rat In A Maze</h1>
      <h3>{timer}</h3>
      <div>
        <div className="maze-container">
          {level.map((row, index) => {
            return (
              <div className="row" key={'row'+index}>
                {row.map((col, index) => {
                  if (col === 1)
                    return <div className="cell" key={'col-'+index}></div>;
                  else if (col === 2)
                    return (
                      <div className="cell" key={'col-'+index}>
                        <img src={rat} alt="rat" className="rat-img" />
                      </div>
                    );
                  else if (col === 3)
                    return (
                      <div className="cell" key={'col-'+index}>
                        <img src={food} alt="food" className="food-img" />
                      </div>
                    );
                  else return <div className="cell wall" key={'col-'+index}></div>;
                })}
              </div>
            );
          })}
        </div>
        <h2>Level {levelCount + 1}</h2>
      </div>
    </div>
  );
}

export default App;
