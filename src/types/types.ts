export interface IPastLaunches {
  launchesPast: Array<PastLaunchData>;
}

export interface PastLaunchData {
  id: string;
  details: string;
  launch_date_utc: string;
  mission_name: string;
  rocket: IRocket;
}

interface IRocket {
  rocket_name: string;
  rocket: IRocketDetails;
}

interface IRocketDetails {
  boosters: string;
  engines: {
    number: number;
    layout: string;
  };
}
