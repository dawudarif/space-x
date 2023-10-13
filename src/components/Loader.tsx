import { LeapFrog } from '@uiball/loaders';

const Loader = () => {
  return (
    <div className='loading'>
      <LeapFrog size={100} speed={2.5} color='#344e41' />
    </div>
  );
};

export default Loader;
