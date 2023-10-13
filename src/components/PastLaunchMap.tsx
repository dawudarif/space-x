import { parseISO, format } from 'date-fns';
import { BsClockHistory } from 'react-icons/bs';
import { PastLaunchData } from '../types/types';

type PastLaunchMapProps = {
  data: Array<PastLaunchData>;
};

const PastLaunchMap: React.FC<PastLaunchMapProps> = ({ data }) => {
  return (
    <>
      {data.map((launch) => (
        <div key={launch.id} className='past-launches'>
          <h1>{launch.mission_name}</h1>
          {launch.details && (
            <code className='launch-details'>{launch.details}</code>
          )}

          <div className='table-parent'>
            <table className='table table-body'>
              <thead className='table-dark'>
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

          <div className='clock'>
            <BsClockHistory size={30} color='#344e41' />
            <span>
              {format(parseISO(launch.launch_date_utc), 'dd-MM-yyyy HH:mm')}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
export default PastLaunchMap;
