import React from 'react';
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';

const Control = ({setCountState, started}) => {
    const PauseButton = () => (<FaRegPauseCircle role="stopCount" onClick={() => setCountState({action: 'pause'})} />);
    const ResumeButton = () => (<FaRegPlayCircle role="startCount" onClick={() => setCountState({action: 'resume'}) }/>);
    const [isPaused, setIsPause] = React.useState(true);
    const handleClick = () => {
        setIsPause(!isPaused);
    }

    return (
      <div onClick={handleClick} className="countdown-icon">
        { started ? isPaused ? <PauseButton /> : <ResumeButton /> : null}
      </div>
    )
}

export default Control;

