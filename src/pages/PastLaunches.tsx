import { useQuery } from '@apollo/client';
import { GET_PAST_LAUNCHES } from '../graphql/Queries';
import { IPastLaunches, PastLaunchData } from '../types/types';
import Loader from '../components/Loader';
import { useState, useEffect, FormEvent } from 'react';
import PastLaunchMap from '../components/PastLaunchMap';

const PastLaunches = () => {
  const [filter, setFilter] = useState('year');
  const [search, setSearch] = useState('');
  const [launchData, setLaunchData] = useState<Array<PastLaunchData>>();

  const { data, loading, error } = useQuery<IPastLaunches>(GET_PAST_LAUNCHES);
  const flippedArray = data && [...data?.launchesPast].reverse();
  console.log(data);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (filter === 'year') {
      const filteredData = flippedArray?.filter(
        (e) => e.launch_date_utc.substring(0, 4) === search,
      );
      setLaunchData(filteredData);
    } else if (filter === 'rocket') {
      const filteredData = flippedArray?.filter(
        (e) => e.rocket.rocket_name === search,
      );
      setLaunchData(filteredData);
    }
  };

  useEffect(() => {
    setLaunchData(flippedArray);
  }, [data]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className='past-launches-wrapper'>
      <div className='past-launches-main'>
        <h1 className='head-h1'>PAST LAUNCHES 🚀</h1>
        <form onSubmit={onSearch}>
          <input
            type='text'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder='Search'
          />
          <select
            id='type'
            name='type'
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value='year'>Year</option>
            <option value='rocket'>Rocket Name</option>
          </select>
          <button>Search</button>
        </form>
        {launchData && <PastLaunchMap data={launchData} />}
      </div>
    </div>
  );
};

export default PastLaunches;
