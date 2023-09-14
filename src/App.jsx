import { useState, useEffect } from "react";
import "./App.css";
import rat from "../public/images/rat.png";
import food from "../public/images/food.png";

function App() {
  const level1 = [
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [2, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 3],
  ];
  const level2 = [
    [2, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 3, 1],
    [1, 0, 1, 1, 0, 1, 1],
  ];
  const [levelCount, setLevelCount] = useState(1);
  const [ratPosition, setRatPosition] = useState([-1, -1]);
  const [level, setLevel] = useState(level2);


  useEffect(() => {
    updateRatPosition()
    // console.log('level changed : ', ratPosition)
    // // console.log('new levels : ', level)
  }, [level]);
  


  function updateRatPosition() {
    for (let i = 0; i < level.length; i++) {
      // let end = false
      for (let j = 0; j < level[i].length; j++) {
        if(level[i][j] === 2) {
          // console.log('hole : ', i, j)
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

// document.addEventListener("keydown", test);
function handleKeyDown(e) {
  // setRatPosition(1)
  // return
// if(!ratPosition) return
  console.log('r', level)

  if (e.key === "ArrowUp") {
    // console.log("up", level[ratPosition[0] - 1]);
    if(level[ratPosition[0] - 1] && [1, 3].includes(level[ratPosition[0] - 1][ratPosition[1]])) {
    //   setLevel(prevState => {
    //     prevState[ratPosition[0]][ratPosition[1]] = 1
    //     prevState[ratPosition[0] - 1][ratPosition[1]] = 2
    //     return prevState
    // })
    // console.log('3acha lmalik')
    if(level[ratPosition[0] - 1][ratPosition[1]] === 3) {
      setTimeout(() => {
        alert('wowwwwwwwwwww')
        setLevelCount(prev => ++prev)
        setLevel(level2)
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
    // console.log(level[ratPosition[0], ratPosition[1] + 1] && [1, 3].includes(level[ratPosition[0]][ratPosition[1] + 1]))
    if(level[ratPosition[0]][ratPosition[1] + 1] && [1, 3].includes(level[ratPosition[0]][ratPosition[1] + 1])) {
      if(level[ratPosition[0]][ratPosition[1] + 1] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
          setLevel(level2)
        }, 500)
      }
      setLevel(prevState => {
        prevState[ratPosition[0]][ratPosition[1]] = 1
        prevState[ratPosition[0]][ratPosition[1] + 1] = 2
        return [...prevState]
    })
    console.log("right hahhah");
  }
}
  if (e.key === "ArrowDown") {
    if(level[ratPosition[0] + 1] && [1, 3].includes(level[ratPosition[0] + 1][ratPosition[1]])) {
      if(level[ratPosition[0] + 1][ratPosition[1]] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
          setLevel(level2)
        }, 500)
      }
      setLevel(prevState => {
          prevState[ratPosition[0]][ratPosition[1]] = 1
          prevState[ratPosition[0] + 1][ratPosition[1]] = 2
          return [...prevState]
      })
  // updateRatPosition()

    }
  }
  if (e.key === "ArrowLeft") {
    if(level[ratPosition[0]][ratPosition[1] - 1] && [1, 3].includes(level[ratPosition[0]][ratPosition[1] - 1])) {
      if(level[ratPosition[0]][ratPosition[1] - 1] === 3) {
        setTimeout(() => {
          alert('wowwwwwwwwwww')
          setLevelCount(prev => ++prev)
          setLevel(level2)
        }, 500)
      }
      setLevel(prevState => {
        prevState[ratPosition[0]][ratPosition[1]] = 1
        prevState[ratPosition[0]][ratPosition[1] - 1] = 2
        return [...prevState]
    })
    console.log("left", ratPosition);
  }
  }

  // console.log(e.key)
}

  return (
    <div className="app">
      <h1>Rat In A Maze</h1>
      <div>
        {/* <div className='maze-container'>
          <div className="row">
            <div className="cell"></div>
            <div className="cell wall"></div>
            <div className="cell wall"></div>
            <div className="cell wall"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell wall"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell wall"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
          <div className="row">
            <div className="cell"></div>
            <div className="cell wall"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
        </div> */}
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
        <h2>Level {levelCount}</h2>
      </div>
    </div>
  );
}

export default App;
