import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: window.innerHeight,
  border: "1px solid green",
  margin: 0,
  padding: 8
};

const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop);

const App = (): JSX.Element => {
  const [items, setItems] = useState(Array.from([1,2,3, 4]));
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
        {items.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;