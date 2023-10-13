import { useQuery } from '@apollo/client';
import { GET_PAST_LAUNCHES } from '../graphql/Queries';
import { parseISO, format } from 'date-fns';
import { IPastLaunches } from '../types/types';
import 'bootstrap/dist/css/bootstrap.min.css';

const PastLaunches = () => {
  const { data } = useQuery<IPastLaunches>(GET_PAST_LAUNCHES);
  console.log(data);

  const flippedArray = data && [...data?.launchesPast].reverse();
  console.log(flippedArray);

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className='past-launches-wrapper'>
      <div className='past-launches-main'>
        <h1 className='head-h1'>PAST LAUNCHES 🚀</h1>
        {flippedArray &&
          flippedArray.map((launch) => (
            <div key={launch.id} className='past-launches'>
              <h1>{launch.mission_name}</h1>
              {launch.details && (
                <div>
                  <h4>Details:</h4>
                  <code>{launch.details}</code>
                </div>
              )}

              <div>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Boosters</th>
                      <th>Engine count</th>
                      <th>Engine layout</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{launch.rocket.rocket_name}</td>
                      <td>{launch.rocket.rocket.boosters}</td>
                      <td>{launch.rocket.rocket.engines.number}</td>
                      <td>{launch.rocket.rocket.engines.layout}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                {format(
                  parseISO(launch.launch_date_utc),
                  'yyyy-MM-dd HH:mm:ss',
                )}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PastLaunches;
