import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import PropTypes from "prop-types";

const CounterItem = ({ end, title }) => {
  return (
    <div className="counter_card_main">
      <div className="">
        <h2 className="counter_count">
          <CountUp end={end} useEasing={true} duration={3} redraw={true}>
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </h2>
      </div>
      <h4 className="counter_title">{title}</h4>
    </div>
  );
};

CounterItem.propTypes = {
  end: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default CounterItem;
