import React from 'react';

class Infinite extends React.Component {
  state = { initialHeight: null, divHeight: null, scrollCount: 1 };
  componentDidMount = () => {
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            let state = { divHeight: mutation.target.clientHeight };
            if (!this.state.initialHeight) {
              state.initialHeight = mutation.target.clientHeight;
            }
            this.setState(() => state);
          }
        });
      });

      const observerConfig = {
        attributes: true,
        childList: true,
        characterData: true
      };
      const targetNode = document.getElementById('custom-infinite');
      observer.observe(targetNode, observerConfig);
    }

    window.addEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    const { action } = this.props;
    const { scrollY, innerHeight } = window;
    const { divHeight, scrollCount, initialHeight } = this.state;
    const totalHeight = innerHeight + scrollY;

    if (
      divHeight === totalHeight &&
      Math.round(divHeight / initialHeight) === scrollCount
    ) {
      this.setState(prevState => ({
        scrollCount: prevState.scrollCount + 1
      }));
      action();
    }
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <div id="custom-infinite" style={{ padding: '20px' }}>
          {this.props.children}
        </div>
        {this.props.children && loading && <div>Loading.....</div>}
      </div>
    );
  }
}

export default Infinite;
