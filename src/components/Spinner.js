import Lottie from 'react-lottie';

const Spinner = (props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require('../animations/spinner.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={50} width={50} />;
};

export { Spinner };
