import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const style = {
  height: window.innerHeight,
  border: "1px solid green",
  margin: 0,
  padding: 8
};

const App = (): JSX.Element => {
  const [items, setItems] = useState(Array.from([1,2,3,4]));
  const [more, setMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 3) {
      setMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      items.concat(Array.from({ length: 3 }));
    }, 500);
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  }

  const scrollTo = () => {
      scroll.scrollTo(window.innerHeight + 18);
  }

  const scrollMore = () => {
    scroll.scrollMore(window.innerHeight + 18);
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={more}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((i, index) => {
          console.log(i);
          if (index === 3) {
            console.log('Hit last');
            return (
              <div style={style} key={index}>
                div - #{index}
                <button onClick={scrollToTop}>Scroll To Top</button>
              </div>
            )
          }

          if (index === 0) {
            return (
              <div style={style} key={index}>
                div - #{index}
                <button onClick={scrollTo}>Scroll</button>
              </div>
            )
          } else {
            return(
              <div style={style} key={index}>
                div - #{index}
                <button onClick={scrollMore}>Keep Scrolling</button>
              </div>
            )
          }
        })}
      </InfiniteScroll>
    </div>
  );
}

export default App;