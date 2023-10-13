import { useQuery } from '@apollo/client';
import { GET_PAST_LAUNCHES } from '../graphql/Queries';
import { IPastLaunches, PastLaunchData } from '../types/types';
import Loader from '../components/Loader';
import { useState, useEffect, FormEvent } from 'react';
import PastLaunchMap from '../components/PastLaunchMap';

const PastLaunches = () => {
  const [filter, setFilter] = useState('mission');
  const [search, setSearch] = useState('');
  const [searchOutput, setSearchOutput] = useState('');
  const [searchResults, setSearchResults] = useState(false);
  const [launchData, setLaunchData] = useState<Array<PastLaunchData>>();

  const { data, loading, error } = useQuery<IPastLaunches>(GET_PAST_LAUNCHES);
  const flippedArray = data && [...data?.launchesPast].reverse();
  // console.log(data);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchResults(true);

    const searched = search.toLowerCase();

    if (filter === 'year') {
      const filteredData = flippedArray?.filter(
        (e) => e.launch_date_utc.substring(0, 4) === search,
      );
      setLaunchData(filteredData);
      setSearchOutput('year: ' + search);
    } else if (filter === 'rocket') {
      const filteredData = flippedArray?.filter((e) => {
        const rocketName = e.rocket.rocket_name.toLowerCase();
        return rocketName.includes(searched);
      });
      setSearchOutput('rocket: ' + search);
      setLaunchData(filteredData);
    } else if (filter === 'mission') {
      const filteredData = flippedArray?.filter((e) => {
        const missionName = e.mission_name.toLowerCase();
        return missionName.includes(searched);
      });
      setSearchOutput('mission: ' + search);
      setLaunchData(filteredData);
    }
  };

  useEffect(() => {
    setLaunchData(flippedArray);
  }, [data]);

  return (
    <div className='past-launches-wrapper'>
      <h1 className='head-h1'>PAST LAUNCHES 🚀</h1>
      <div className='past-launches-main'>
        <div className='search'>
          <input
            type='text'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder='Search'
          />
          <select
            id='type'
            name='type'
            className='select-option'
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value='mission'>Mission Name</option>
            <option value='year'>Year</option>
            <option value='rocket'>Rocket Name</option>
          </select>
          <button type='submit' onClick={onSearch}>
            Search
          </button>
          <button
            onClick={() => {
              setSearchOutput('');
              setSearch('');
              setLaunchData(flippedArray);
            }}
          >
            ALL
          </button>
        </div>
        {searchResults &&
          (launchData && launchData.length > 0 ? (
            <h1 className='search-head'>
              Showing Search Results for {searchOutput}
            </h1>
          ) : (
            <h1 className='search-head'>No results</h1>
          ))}
        {loading ? (
          <Loader />
        ) : (
          launchData &&
          launchData.length > 0 && <PastLaunchMap data={launchData} />
        )}
        {error && <div className='search-head'>{error.message}</div>}
      </div>
    </div>
  );
};

export default PastLaunches;
